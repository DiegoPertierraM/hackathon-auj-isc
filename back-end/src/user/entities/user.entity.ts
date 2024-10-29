export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  created: Date;
  updated: Date;
  UserTasks: { userId: number; taskId: number }[];
}
export class SignUser {
  id: number;
  email: string;
  name: string;
  password: string;
}
