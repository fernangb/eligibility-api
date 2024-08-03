import { Module } from '@nestjs/common';
import { EligibilityModule } from './application/eligibilities/eligibility.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EligibilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
