import { Module } from '@nestjs/common';
import { CustomerConsumptionClassService } from './services/customer-consumption-class.service';

@Module({
  controllers: [],
  providers: [CustomerConsumptionClassService],
  exports: [CustomerConsumptionClassService],
})
export class CustomerConsumptionClassModule {}
