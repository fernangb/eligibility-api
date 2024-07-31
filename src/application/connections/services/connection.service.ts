import { Injectable } from '@nestjs/common';
import { ConnectionTypeEnum } from 'src/domain/connections/enums/connection-type.enum';
import { ConnectionStrategyService } from '../strategies/connection-types/connection-strategy.service';

@Injectable()
export class ConnectionService {
  constructor(private connectionStrategyService: ConnectionStrategyService) {}

  validate(items: number[], type: ConnectionTypeEnum): boolean {
    const average = this.getAverage(items);

    const strategy = this.connectionStrategyService.getStrategy(type);

    return strategy.validate(average);
  }

  getAverage(items: number[]): number {
    const sum = items.reduce((acc, value) => acc + value, 0);
    return sum / items.length;
  }
}
