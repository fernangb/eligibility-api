import { BadRequestException } from '@nestjs/common';

export class InvalidConsumptionHistoryValueException extends BadRequestException {
  constructor() {
    super('Histórico de consumo com valor inválido');
  }
}
