export class CreateTaskDto {
  id: number;
  title: string;
  description: string;
  taskDate: Date;
  notification: Date;
  expirationDate: Date;
  created: Date;
  updated: Date;
  userId: number;
}
