import { Module } from '@nestjs/common';
import { EligibilityModule } from './application/eligibilities/eligibility.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EligibilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
