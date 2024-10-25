/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    try {
      return await this.prisma.participant.create({
        data: createParticipantDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findAll(): Promise<Participant[]> {
    try {
      return await this.prisma.participant.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async findOne(id: number): Promise<Participant | null> {
    try {
      const participant = await this.prisma.participant.findUnique({
        where: { id },
      });
      if (!participant) {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }
      return participant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Server Error');
    }
  }

  async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    try {
      return await this.prisma.participant.update({
        where: { id },
        data: updateParticipantDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Participant> {
    try {
      return await this.prisma.participant.delete({
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
