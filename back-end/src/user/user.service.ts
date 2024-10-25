import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SignUser, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private service: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.service.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return await this.service.user.findMany();
  }

  async findForLogin(email: string): Promise<SignUser | null> {
    return await this.service.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });
  }

  async findOne(id: string) {
    try {
      return await this.service.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(error, `User with ${id} not found`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.service.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.service.user.delete({
      where: { id },
    });
  }
}
