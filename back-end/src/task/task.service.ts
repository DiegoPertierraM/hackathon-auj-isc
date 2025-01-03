/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from './entities/task.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly service: PrismaService,
    private readonly mailService: EmailService,
    private readonly userService: UserService,
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
      return await this.service.task.findMany({
        include: {
          UserTask: {
            // Include UserTask relation
            include: {
              user: true, // Include related user data
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      const task = await this.service.task.findUnique({
        where: { id },
        include: {
          UserTask: {
            // Include UserTask relation
            include: {
              user: true, // Include related user data
            },
          },
        },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
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
      const taskByUser = await this.findUsersByTaskId(id);
      for (const task of taskByUser) {
        await this.userService.removeTaskToUser(task.id, id);
      }
      const removetask = await this.service.task.delete({
        where: { id },
      });
      return removetask;
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

  //Send email for notificacion of task that have tomorrow
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkTaskNotification() {
    console.log('Checking task notifications for tomorrow');

    const tasks = await this.findAll();
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate());
    tomorrow.setHours(0, 0, 0, 0);

    for (const task of tasks) {
      const taskDate = new Date(task.notification);
      console.log(
        `taskDate: ${taskDate.toDateString()}, tomorrow: ${tomorrow.toDateString()}`,
      );

      // Verify if the task is tomorrow
      if (taskDate.toDateString() === tomorrow.toDateString()) {
        const users = await this.findUsersByTaskId(task.id);
        for (const user of users) {
          try {
            const formattedMinutes = taskDate
              .getMinutes()
              .toString()
              .padStart(2, '0');
            console.log(`Checking task expiration by email to ${user.email}`);
            await this.mailService.sendEmail(
              'Impact Social Cup',
              user.email,
              `Notificacion de tarea ${task.title}: tarea de mañana`,
              `La tarea ${task.title} tiene lugar mañana a las ${taskDate.getHours()}:${formattedMinutes}}`,
              `<h1>La tarea ${task.title} tiene lugar mañana a las ${taskDate.getHours()}:${formattedMinutes}}</h1>`,
            );
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }
      }
    }
  }
  //Send email for notificacion of task expire tomorrow
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkTaskExpiration() {
    console.log('Checking task expiration');
    const tasks = await this.findAll();
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate());
    tomorrow.setHours(0, 0, 0, 0);

    for (const task of tasks) {
      const expirationDate = new Date(task.expirationDate);
      expirationDate.setHours(0, 0, 0, 0);

      // Verify if the task expires tomorrow
      if (expirationDate.getTime() === tomorrow.getTime()) {
        const users = await this.findUsersByTaskId(task.id);
        for (const user of users) {
          try {
            const formattedMinutes = new Date(task.expirationDate)
              .getMinutes()
              .toString()
              .padStart(2, '0');
            await this.mailService.sendEmail(
              'Impact Social Cup',
              user.email,
              `Notificacion de tarea ${task.title}: expira mañana`,
              `La tarea ${task.title} ${task.description}expira mañana a las ${new Date(task.expirationDate).getHours()}:${formattedMinutes}`,
              `<h1>La tarea ${task.title} expira mañana a las ${new Date(task.expirationDate).getHours()}:${new Date(task.expirationDate).getMinutes()}</h1>`,
            );
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async checkNotificacion() {
    const tasks = await this.findAll();
    const now = new Date();
    for (const task of tasks) {
      const taskDate = new Date(task.notification);
      if (taskDate.toDateString === now.toDateString) {
        const users = await this.findUsersByTaskId(task.id);
        for (const user of users) {
          try {
            const formattedMinutes = taskDate
              .getMinutes()
              .toString()
              .padStart(2, '0');
            await this.mailService.sendEmail(
              'Impact Social Cup',
              user.email,
              `Notificacion de tarea ${task.title}`,
              `La tarea ${task.title} tiene lugar ${taskDate.getDate()} a las ${taskDate.getHours()}:${formattedMinutes}`,
              `<h1>La tarea ${task.title} tiene lugar ${taskDate.getDate()} a las ${taskDate.getHours()}:${formattedMinutes}</h1>`,
            );
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }
      }
    }
  }
}
