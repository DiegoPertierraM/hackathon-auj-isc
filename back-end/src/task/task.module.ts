import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CoreModule } from '../core/core.module';
import { EmailService } from '../email/email.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule, CoreModule],
  controllers: [TaskController],
  providers: [TaskService, PrismaService, EmailService, UserService],
})
export class TaskModule {}
