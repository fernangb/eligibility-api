import { BadRequestException, Injectable } from '@nestjs/common';
import { ConnectionTypeEnum } from 'src/domain/connections/enums/connection-type.enum';
import { SinglePhaseConnectionStrategyService } from './single-phase-connection-strategy.service';
import { BiphasicConnectionStrategyService } from './biphasic-strategy.service';
import { ConnectionStrategyInterface } from './interfaces/connection-strategy.interface';
import { ThreePhaseConnectionStrategyService } from './three-phase.strategy.service';

@Injectable()
export class ConnectionStrategyService {
  getStrategy(type: ConnectionTypeEnum): ConnectionStrategyInterface {
    switch (type) {
      case ConnectionTypeEnum.SINGLE_PHASE:
        return new SinglePhaseConnectionStrategyService();
      case ConnectionTypeEnum.BIPHASIC:
        return new BiphasicConnectionStrategyService();
      case ConnectionTypeEnum.THREE_PHASE:
        return new ThreePhaseConnectionStrategyService();
      default:
        throw new BadRequestException('Tipo de conexão inválida');
    }
  }
}
