import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [OpportunityController],
  providers: [OpportunityService, PrismaService],
})
export class OpportunityModule {}
