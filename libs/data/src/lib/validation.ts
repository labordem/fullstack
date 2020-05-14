interface Validation {
  regexp: RegExp;
  message: string;
}

export const validEmail: Validation = {
  regexp: /^(?=.{4,64}$)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  message: 'must be an email',
};

export const validUsername: Validation = {
  regexp: /^(?=.{4,20}$)[a-z][a-z0-9]+(?:-[a-z0-9]+)?$/,
  message: 'must contains 4-20 alphanumerics characters',
};

export const validPassword: Validation = {
  regexp: /^.{8,191}$/,
  message: 'must contains 8-191 characters',
};
