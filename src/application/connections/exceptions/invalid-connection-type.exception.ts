import { BadRequestException } from '@nestjs/common';

export class InvalidConnectionTypeException extends BadRequestException {
  constructor() {
    super('Tipo de conexão inválida');
  }
}
