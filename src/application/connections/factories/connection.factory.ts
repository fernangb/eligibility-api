import { Injectable } from '@nestjs/common';
import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { ConnectionStrategyInterface } from '../interfaces/connection-strategy.interface';
import { BiphasicConnectionStrategy } from '../strategies/biphasic-connection.strategy';
import { SinglePhaseConnectionStrategy } from '../strategies/single-phase-connection.strategy';
import { ThreePhaseConnectionStrategy } from '../strategies/three-phase-connection.strategy';
import { InvalidConnectionTypeException } from '../exceptions/invalid-connection-type.exception';

@Injectable()
export class ConnectionFactory {
  getStrategy(type: ConnectionTypeEnum): ConnectionStrategyInterface {
    switch (type) {
      case ConnectionTypeEnum.SINGLE_PHASE:
        return new SinglePhaseConnectionStrategy();
      case ConnectionTypeEnum.BIPHASIC:
        return new BiphasicConnectionStrategy();
      case ConnectionTypeEnum.THREE_PHASE:
        return new ThreePhaseConnectionStrategy();
      default:
        throw new InvalidConnectionTypeException();
    }
  }
}
