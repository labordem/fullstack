import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/api/src/environments/environment';
import { compare } from 'bcryptjs';
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { AuthSigninInput } from '../dto/auth-signin.input';
import { AuthSignupInput } from '../dto/auth-signup.input';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signin(data: AuthSigninInput): Promise<string> {
    const userByEmail = await this.userRepository.findOne({
      email: data.email,
    });
    if (!userByEmail) {
      throw new HttpException('email not found', HttpStatus.NOT_FOUND);
    }
    if (!(await compare(data.password, userByEmail.password))) {
      throw new HttpException('incorrect password', HttpStatus.UNAUTHORIZED);
    }
    const currentUserToken = this.jwtService.signCurrentUserToken(userByEmail);
    return currentUserToken;
  }

  async signup(data: AuthSignupInput): Promise<string> {
    const userByUsername = await this.userRepository.findOne({
      username: data.username,
    });
    if (userByUsername) {
      throw new HttpException(
        'username already exists',
        HttpStatus.BAD_REQUEST
      );
    }
    const userByEmail = await this.userRepository.findOne({
      email: data.email,
    });
    if (userByEmail) {
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.userRepository.create(data);
    const savedNewUser = await this.userRepository.save(newUser);
    const currentUserToken = this.jwtService.signCurrentUserToken(savedNewUser);
    this.sendEmailConfirmation(savedNewUser.id);
    return currentUserToken;
  }

  async sendEmailConfirmation(userId: number): Promise<boolean> {
    const newUser = await this.userRepository.findOne({ id: userId });
    if (!newUser) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    if (newUser.isConfirmed) {
      throw new HttpException('user already confirmed', HttpStatus.BAD_REQUEST);
    }
    const emailToken = this.jwtService.signEmailToken(newUser.email);
    const emailConfirmationLink = encodeURI(
      `http://${environment.PWA_DOMAIN}:${environment.PWA_PORT}/auth/email-confirmation/${emailToken}`
    );
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await createTestAccount();
    const transporter = createTransport({
      host: environment.EMAIL_HOST,
      port: environment.EMAIL_PORT,
      secure: environment.EMAIL_SECURE, // true for 465, false for other ports
      auth: {
        user: environment.EMAIL_USER || testAccount.user, // generated ethereal user
        pass: environment.EMAIL_PASS || testAccount.pass, // generated ethereal password
      },
    });
    const info = await transporter.sendMail({
      from: environment.EMAIL_FROM, // sender address
      to: [newUser.email], // list of receivers
      subject: 'Confirm your account', // Subject line
      text: `
        Welcome ${newUser.username}!
        Please go to
        ${emailConfirmationLink}
        to confirm your account.
      `, // plain text body
      html: `
        <h1>Welcome ${newUser.username} !</h1>
        <p>Please go to <href>${emailConfirmationLink}</href> to confirm your account.</p>
      `, // html body
    });
    console.log(`Message sent: ${info.messageId}`);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log(`Email : ${getTestMessageUrl(info)}`);
    return true;
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  async confirmEmail(emailToken: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const decodedEmail = this.jwtService.verifyEmailToken(emailToken);
    const userByEmail = await this.userRepository.findOne({
      email: decodedEmail,
    });
    if (userByEmail.isConfirmed) {
      throw new HttpException('user already confirmed', HttpStatus.BAD_REQUEST);
    }
    userByEmail.isConfirmed = true;
    const savedUser = await this.userRepository.save(userByEmail);
    const currentUserToken = this.jwtService.signCurrentUserToken(savedUser);
    return currentUserToken;
  }
}
