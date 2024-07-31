import { Injectable } from '@nestjs/common';
import { ConnectionStrategyInterface } from './interfaces/connection-strategy.interface';

@Injectable()
export class SinglePhaseConnectionStrategyService
  implements ConnectionStrategyInterface
{
  validate(average: number): boolean {
    const MIN_VALUE = 400;

    if (average < MIN_VALUE) return false;

    return true;
  }
}
