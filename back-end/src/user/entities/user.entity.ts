export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
  created: Date;
  updated: Date;
}
export class SignUser {
  id: string;
  email: string;
  password: string;
}
