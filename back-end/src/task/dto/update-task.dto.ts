import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  id: number;
  title: string;
  description: string;
  taskDate: Date;
  notification: Date;
  expirationDate: Date;
  created: Date;
  updated: Date;
}
