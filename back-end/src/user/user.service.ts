import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private service: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.service.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.service.user.findMany();
  }

  async findByEmail(email: string) {
    return await this.service.user.findUnique({
      where: { email },
    });
  }

  async findOne(id: string) {
    return await this.service.user.findUnique({
      where: { id },
    });
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
