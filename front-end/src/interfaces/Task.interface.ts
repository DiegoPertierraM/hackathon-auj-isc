import { UserData } from './User.interface';

export interface Task {
  id: number;
  title: string;
  taskDate: string;
  notification: string;
  expirationDate: string;
  user: UserData[];
  description: string;
}

export interface TaskFormData {
  title: string;
  taskDate: string;
  notification: string;
  expirationDate: string;
  user: UserData[];
  description: string;
}

export interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: TaskFormData) => void;
}
