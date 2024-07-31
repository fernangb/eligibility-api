import { Injectable } from '@nestjs/common';
import { ConnectionStrategyInterface } from './interfaces/connection-strategy.interface';

@Injectable()
export class BiphasicConnectionStrategyService
  implements ConnectionStrategyInterface
{
  validate(average: number): boolean {
    const MIN_VALUE = 500;

    if (average < MIN_VALUE) return false;

    return true;
  }
}
