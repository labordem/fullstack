import { Injectable, UnauthorizedException } from '@nestjs/common';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/api/src/environments/environment';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class JwtService {
  verifyEmailToken(token: string): string {
    try {
      const decoded = verify(token, environment.JWT_EMAIL_KEY) as {
        email: string;
      };
      return decoded.email;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  verifyCurrentUserToken(token: string): User {
    try {
      return verify(token, environment.JWT_USER_KEY) as User;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  signEmailToken(email: string): string {
    try {
      return sign({ email }, environment.JWT_EMAIL_KEY, { expiresIn: '15m' });
    } catch (err) {
      throw new UnauthorizedException('token creation failed');
    }
  }

  signCurrentUserToken(userPayload: User): string {
    try {
      const { password, ...currentUser } = userPayload;
      return sign({ currentUser }, environment.JWT_USER_KEY, {
        expiresIn: '7d',
      });
    } catch (err) {
      throw new UnauthorizedException('token creation failed');
    }
  }
}
