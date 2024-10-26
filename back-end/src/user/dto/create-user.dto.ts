export class CreateUserDto {
  id: number;
  name: string;
  password: string;
  email: string;
  phone?: string;
  created: Date;
  updated: Date;
}
