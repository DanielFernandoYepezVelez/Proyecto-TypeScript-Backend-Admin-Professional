export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  google?: boolean;
  activate?: boolean;
  created_at?: Date;
}
