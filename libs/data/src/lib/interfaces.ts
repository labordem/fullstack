export interface CurrentUser {
  id: number;
  created: Date;
  updated: Date;
  username: string;
  email: string;
  avatar?: string;
}
