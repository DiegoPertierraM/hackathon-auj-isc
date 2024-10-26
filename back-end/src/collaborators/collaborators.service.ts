import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Collaborators } from '@prisma/client';

@Injectable()
export class CollaboratorsService {
  constructor(private readonly service: PrismaService) {}

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborators> {
    try {
      return await this.service.collaborators.create({
        data: createCollaboratorDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async findAll(): Promise<Collaborators[]> {
    try {
      return await this.service.collaborators.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async findOne(id: number): Promise<Collaborators> {
    try {
      const collaborator = await this.service.collaborators.findUnique({
        where: { id },
      });

      if (!collaborator) {
        throw new NotFoundException(`Collaborator with ID ${id} not found`);
      }
      return collaborator;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }
  async update(
    id: number,
    updateCollaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborators> {
    try {
      return await this.service.collaborators.update({
        where: { id },
        data: updateCollaboratorDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Collaborator with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Collaborators> {
    try {
      return await this.service.collaborators.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Collaborator with ID ${id} not found`);
      }
      throw error;
    }
  }
}
