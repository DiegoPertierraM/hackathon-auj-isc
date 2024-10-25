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

@Injectable()
export class UserService {
  constructor(private service: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      return await this.service.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.service.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findForLogin(email: string): Promise<SignUser | null> {
    return await this.service.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
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

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Server Error');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.service.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.service.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }
}
