import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Opportunity } from './entities/opportunity.entity';

@Injectable()
export class OpportunityService {
  constructor(private readonly service: PrismaService) {}

  async create(
    createOpportunityDto: CreateOpportunityDto,
  ): Promise<Opportunity> {
    try {
      return await this.service.opportunity.create({
        data: createOpportunityDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async findAll() {
    try {
      return await this.service.opportunity.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async findOne(id: string) {
    try {
      const opportunity = await this.service.opportunity.findUnique({
        where: { id },
      });

      if (!opportunity) {
        throw new NotFoundException(`Opportunity with ID ${id} not found`);
      }

      return opportunity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Server Error');
    }
  }

  async update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    try {
      return await this.service.opportunity.update({
        where: { id },
        data: updateOpportunityDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Opportunity with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.service.opportunity.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Opportunity with ID ${id} not found`);
      }
      throw error;
    }
  }
}
