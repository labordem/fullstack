export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthSigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthSignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: Scalars['String'];
  confirmEmail: Scalars['String'];
  userCreate: User;
  userDelete: Scalars['Boolean'];
};

export type MutationSignupArgs = {
  authSignupInput: AuthSignupInput;
};

export type MutationConfirmEmailArgs = {
  emailToken: Scalars['String'];
};

export type MutationUserCreateArgs = {
  data: UserCreateInput;
};

export type MutationUserDeleteArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  signin: Scalars['String'];
  sendEmailConfirmation: Scalars['String'];
  user: User;
  users: Array<User>;
};

export type QuerySigninArgs = {
  authSigninInput: AuthSigninInput;
};

export type QuerySendEmailConfirmationArgs = {
  currentUserId: Scalars['Float'];
};

export type QueryUserArgs = {
  id: Scalars['Float'];
};

export type QueryUsersArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Record = {
  __typename?: 'Record';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Subscription = {
  __typename?: 'Subscription';
  userCreated: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};
