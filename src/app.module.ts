import { Module } from '@nestjs/common';
import { EligibilityModule } from './application/eligibilities/eligibility.module';

@Module({
  imports: [EligibilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
