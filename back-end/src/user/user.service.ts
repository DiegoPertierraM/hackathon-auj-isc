/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SignUser, User } from './entities/user.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly service: PrismaService,
    private readonly mailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = await this.service.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return {
        ...newUser,
        UserTasks: [],
      };
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.service.user.findMany();
      return await Promise.all(
        users.map(async (user) => ({
          ...user,
          UserTasks: await this.service.userTask.findMany({
            where: { userId: user.id },
          }),
        })),
      );
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findForLogin(email: string): Promise<SignUser | null> {
    return await this.service.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, password: true },
    });
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.service.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        ...user,
        UserTasks: await this.service.userTask.findMany({
          where: { userId: user.id },
        }),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Server Error');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return {
        ...(await this.service.user.update({
          where: { id },
          data: updateUserDto,
        })),
        UserTasks: await this.service.userTask.findMany({
          where: { userId: id },
        }),
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const deletedUser = await this.service.user.delete({
        where: { id },
      });
      return {
        ...deletedUser,
        UserTasks: await this.service.userTask.findMany({
          where: { userId: id },
        }),
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  //add user to task and send notificacion by email
  async addTaskToUser(userId: number, taskId: number) {
    const taskToUser = this.service.userTask.create({
      data: {
        userId,
        taskId,
      },
    });
    const user = await this.findOne(userId);
    const task = await this.service.task.findUnique({
      where: { id: taskId },
    });
    this.mailService.sendEmail(
      'Impact Social Cup',
      user.email,
      'Task assigned',
      `You have been assigned to the task ${task.title}`,
      `<h1>Task assigned</h1><br><p>You have been assigned to the task ${task.title} tendrà lugar a las ${task.taskDate.getHours()} el dia ${task.taskDate.getDay()} de ${task.taskDate.getMonth()}<strong>`,
    );

    return taskToUser;
  }

  // remove task to user
  async removeTaskToUser(userId: number, taskId: number) {
    return await this.service.userTask.delete({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
    });
  }
  //passwrod recovery
  async passwordRecovery(email: string) {
    const user = await this.findForLogin(email);
    if (!user) {
      throw new NotFoundException(`User with ${email} not found`);
    }
    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.service.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    this.mailService.sendEmail(
      'Impact Social Cup',
      user.email,
      'Password recovery',
      `Your new password is ${newPassword}`,
    );
  }
}
