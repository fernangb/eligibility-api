import { BadRequestException, Injectable } from '@nestjs/common';
import { ConnectionTypeEnum } from 'src/domain/connections/enums/connection-type.enum';
import { ConnectionStrategyInterface } from '../interfaces/connection-strategy.interface';
import { BiphasicConnectionStrategy } from '../strategies/biphasic-strategy';
import { SinglePhaseConnectionStrategy } from '../strategies/single-phase-connection-strategy';
import { ThreePhaseConnectionStrategy } from '../strategies/three-phase.strategy';

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
        throw new BadRequestException('Tipo de conexão inválida');
    }
  }
}
