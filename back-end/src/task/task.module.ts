import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoreModule } from '../core/core.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [CoreModule],
  controllers: [TaskController],
  providers: [TaskService, PrismaService, EmailService],
})
export class TaskModule {}
