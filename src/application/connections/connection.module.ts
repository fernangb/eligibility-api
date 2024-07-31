import { Module } from '@nestjs/common';
import { ConnectionService } from './services/connection.service';
import { BiphasicConnectionStrategyService } from './strategies/connection-types/biphasic-strategy.service';
import { ConnectionStrategyService } from './strategies/connection-types/connection-strategy.service';
import { SinglePhaseConnectionStrategyService } from './strategies/connection-types/single-phase-connection-strategy.service';
import { ThreePhaseConnectionStrategyService } from './strategies/connection-types/three-phase.strategy.service';

@Module({
  controllers: [],
  providers: [
    ConnectionService,
    ConnectionStrategyService,
    SinglePhaseConnectionStrategyService,
    BiphasicConnectionStrategyService,
    ThreePhaseConnectionStrategyService,
  ],
  exports: [ConnectionService],
})
export class ConnectionModule {}
