export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
}

export interface Mutation {
  __typename?: 'Mutation';
  userCreate: User;
  userDelete: Scalars['Boolean'];
}

export interface MutationUserCreateArgs {
  data: UserCreateInput;
}

export interface MutationUserDeleteArgs {
  id: Scalars['Float'];
}

export interface Query {
  __typename?: 'Query';
  user: User;
  users: Array<User>;
}

export interface QueryUserArgs {
  id: Scalars['Float'];
}

export interface Subscription {
  __typename?: 'Subscription';
  userCreated: User;
}

export interface User {
  __typename?: 'User';
  id: Scalars['ID'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  username: Scalars['String'];
}

export interface UserCreateInput {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}
