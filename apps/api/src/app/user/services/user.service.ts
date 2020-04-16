import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from '../../shared/dto/pagination.args';
import { UserCreateInput } from '../dto/user-create.input';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(data: UserCreateInput): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async read(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  async readAll(paginationArgs: PaginationArgs): Promise<User[]> {
    return this.userRepository.find(paginationArgs);
  }

  async update(data: User): Promise<User> {
    return this.userRepository.save(data);
  }

  async delete(id: number): Promise<boolean> {
    await this.userRepository.delete({ id });
    return true;
  }
}
