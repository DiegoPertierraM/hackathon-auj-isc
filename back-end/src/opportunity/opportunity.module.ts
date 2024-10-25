import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OpportunityController],
  providers: [OpportunityService, PrismaService],
})
export class OpportunityModule {}
