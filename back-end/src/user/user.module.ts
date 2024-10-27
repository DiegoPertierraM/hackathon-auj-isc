import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CoreModule } from '../core/core.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [PrismaModule, CoreModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService],
})
export class UserModule {}
