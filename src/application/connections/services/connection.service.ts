import { Injectable } from '@nestjs/common';
import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { ConnectionFactory } from '../factories/connection.factory';
import { InvalidConnectionAverageException } from '../exceptions/invalid-average.exception';

@Injectable()
export class ConnectionService {
  constructor(private connectionFactory: ConnectionFactory) {}

  validate(items: number[], type: ConnectionTypeEnum): boolean {
    const average = this.getAverage(items);

    const strategy = this.connectionFactory.getStrategy(type);

    return strategy.validate(average);
  }

  private getAverage(items: number[]): number {
    if (!items.length) throw new InvalidConnectionAverageException();

    const sum = items.reduce((acc, value) => acc + value, 0);
    return sum / items.length;
  }
}
