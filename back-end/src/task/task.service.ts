/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly service: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.service.task.create({
        data: createTaskDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.service.task.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      return await this.service.task.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      return await this.service.task.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Task> {
    try {
      return await this.service.task.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      throw error;
    }
  }
}
