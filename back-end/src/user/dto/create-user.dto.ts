export class CreateUserDto {
  id: number;
  name: string;
  password: string;
  email: string;
  phone?: string;
  company?: string;
  created: Date;
  updated: Date;
}
