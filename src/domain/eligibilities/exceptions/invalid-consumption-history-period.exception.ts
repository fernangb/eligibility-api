import { BadRequestException } from '@nestjs/common';

export class InvalidConsumptionHistoryPeriodException extends BadRequestException {
  constructor() {
    super('Histórico de consumo com período inválido');
  }
}
