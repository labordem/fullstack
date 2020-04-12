import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  @Field()
  updated: Date;

  @Field()
  @Column('varchar', { length: 20, unique: true })
  username: string;

  /* Non-reachable fields ----------------------------------------------------- */

  @Column('varchar', { length: 64, unique: true })
  email: string;

  @Column('varchar', { length: 191 })
  password: string;

  @Column('boolean', { default: false })
  isConfirmed: boolean;
}
