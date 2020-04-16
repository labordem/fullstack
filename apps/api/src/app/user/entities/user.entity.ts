import { hash } from 'bcryptjs';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
