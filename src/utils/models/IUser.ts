export interface IUser {
  name: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  google?: boolean;
  doctor_id?: number;
  activate?: boolean;
  created_at?: Date;
}
