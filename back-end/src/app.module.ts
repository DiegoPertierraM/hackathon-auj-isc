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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    CoreModule,
    ParticipantModule,
    OpportunityModule,
    CollaboratorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
