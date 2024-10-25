export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
  created: Date;
  updated: Date;
}
export class SignUser {
  id: number;
  email: string;
  password: string;
}
