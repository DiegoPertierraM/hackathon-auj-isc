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
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly service: PrismaService,
    private readonly mailService: EmailService,
  ) {}

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

  async getUsersByTask(taskId: number) {
    return this.service.task.findUnique({
      where: { id: taskId },
      include: { user: true },
    });
  }

  async getTasksByUser(userId: number) {
    return this.service.user.findUnique({
      where: { id: userId },
      include: { tasks: true },
    });
  }

  async findUsersByTaskId(taskId: number) {
    return this.service.user.findMany({
      where: {
        UserTask: {
          some: {
            taskId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  // this send email for notificacion of task
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkTaskNotification() {
    const tasks = await this.findAll();
    const now = new Date();
    for (const task of tasks) {
      const taskDate = new Date(task.notification);
      const timeDiff = taskDate.getTime() - now.getTime();
      //if left one day for the notification
      if (timeDiff <= 24 * 60 * 60 * 1000 && timeDiff > 23 * 60 * 60 * 1000) {
        const users = await this.findUsersByTaskId(task.id);
        for (const user of users) {
          await this.mailService.sendEmail(
            'Impact Social Cup',
            user.email,
            'Notificacion de tarea',
            `La tarea ${task.title} tiene lugar mañana a las ${taskDate.getHours()}:${taskDate.getMinutes()}`,
            `<h1>La tarea ${task.title} tiene lugar mañana a las ${taskDate.getHours()}:${taskDate.getMinutes()}</h1>`,
          );
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkTaskExpiration() {
    const tasks = await this.findAll();
    const now = new Date();
    for (const task of tasks) {
      const expirationDate = new Date(task.expirationDate);
      const timeDiff = expirationDate.getTime() - now.getTime();
      //If there is one day left for the expiration
      if (timeDiff <= 24 * 60 * 60 * 1000 && timeDiff > 23 * 60 * 60 * 1000) {
        const users = await this.findUsersByTaskId(task.id);
        for (const user of users) {
          await this.mailService.sendEmail(
            'Impact Social Cup',
            user.email,
            'Notificacion de tarea',
            `La tarea ${task.title} expira mañana a las ${expirationDate.getHours()}:${expirationDate.getMinutes()}`,
            `<h1>La tarea ${task.title} expira mañana a las ${expirationDate.getHours()}:${expirationDate.getMinutes()}</h1>`,
          );
        }
      }
    }
  }
}
