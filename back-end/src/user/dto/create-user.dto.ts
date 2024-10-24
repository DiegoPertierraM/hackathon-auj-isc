export class CreateUserDto {
  id: string;
  name: string;
  password: string;
  email: string;
  phone?: string;
  company?: string;
  created: Date;
  updated: Date;
}
