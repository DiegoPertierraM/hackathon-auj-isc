import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ParticipantModule } from './participant/participant.module';
import { OpportunityModule } from './opportunity/opportunity.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { TaskModule } from './task/task.module';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    PrismaModule,
    CoreModule,
    ParticipantModule,
    OpportunityModule,
    CollaboratorsModule,
    TaskModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
