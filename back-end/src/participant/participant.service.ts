import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return await this.prisma.participant.create({
      data: createParticipantDto,
    });
  }

  async findAll() {
    return await this.prisma.participant.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.participant.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    return await this.prisma.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.participant.delete({
      where: { id },
    });
  }
}
