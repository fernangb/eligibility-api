import { Module } from '@nestjs/common';
import { TariffModalityService } from './services/tariff-modality.service';

@Module({
  controllers: [],
  providers: [TariffModalityService],
  exports: [TariffModalityService],
})
export class TariffModalityModule {}
