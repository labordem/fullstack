import { IsOptional } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int)
  @IsOptional()
  skip?: number;

  @Field((type) => Int)
  @IsOptional()
  take?: number;
}
