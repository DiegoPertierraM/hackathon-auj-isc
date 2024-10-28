import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CoreModule } from '../core/core.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, CoreModule],
  controllers: [OpportunityController],
  providers: [OpportunityService, PrismaService],
})
export class OpportunityModule {}
