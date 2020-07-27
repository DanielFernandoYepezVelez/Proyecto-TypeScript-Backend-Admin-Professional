export interface IUser {
  name: string;
  password: string;
  email: string;
  img?: string;
  role?: string;
  google?: boolean;
  doctor_id?: number;
  created_at?: Date;
}
