import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, PrismaService],
})
export class CollaboratorsModule {}
