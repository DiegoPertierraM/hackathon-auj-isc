import { Task } from './Task.interface';

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  phone: string;
  tasks: Task[];
  created: string;
  updated: string;
}
