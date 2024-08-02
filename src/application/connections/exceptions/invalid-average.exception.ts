import { BadRequestException } from '@nestjs/common';

export class InvalidConnectionAverageException extends BadRequestException {
  constructor() {
    super('Não é possível calcular a média');
  }
}
