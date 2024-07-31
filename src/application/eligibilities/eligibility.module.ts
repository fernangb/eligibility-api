import { Module } from '@nestjs/common';
import { ConnectionModule } from '../connections/connection.module';
import { CustomerConsumptionClassModule } from '../customer-consumption-classes/customer-consumption-class.module';
import { EligibilityController } from './controllers/eligibility.controller';
import { EligibilityService } from './services/eligibility.service';
import { TariffModalityModule } from '../tariff-modalities/tariff-modality.module';

@Module({
  imports: [
    ConnectionModule,
    CustomerConsumptionClassModule,
    TariffModalityModule,
  ],
  controllers: [EligibilityController],
  providers: [EligibilityService],
  exports: [EligibilityService],
})
export class EligibilityModule {}
