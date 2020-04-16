import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-fastify';
import { PaginationArgs } from '../../shared/dto/pagination.args';
import { UserCreateInput } from '../dto/user-create.input';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

const pubsub = new PubSub();

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User)
  async userCreate(@Args('data') data: UserCreateInput) {
    const user = await this.userService.create(data);
    await pubsub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Query((returns) => User)
  user(@Args('id') id: number) {
    return this.userService.read(id);
  }

  @Query((returns) => [User])
  users(@Args() paginationArgs: PaginationArgs) {
    return this.userService.readAll(paginationArgs);
  }

  @Mutation((returns) => Boolean)
  userDelete(@Args('id') id: number) {
    return this.userService.delete(id);
  }

  @Subscription((returns) => User)
  userCreated() {
    return pubsub.asyncIterator('userCreated');
  }
}
