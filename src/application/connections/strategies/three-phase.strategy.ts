import { Injectable } from '@nestjs/common';
import { ConnectionStrategyInterface } from '../interfaces/connection-strategy.interface';

@Injectable()
export class ThreePhaseConnectionStrategy
  implements ConnectionStrategyInterface
{
  validate(average: number): boolean {
    const MIN_VALUE = 750;

    if (average < MIN_VALUE) return false;

    return true;
  }
}
