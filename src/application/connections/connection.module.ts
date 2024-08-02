import { Module } from '@nestjs/common';
import { ConnectionService } from './services/connection.service';
import { ConnectionFactory } from './factories/connection.factory';

@Module({
  controllers: [],
  providers: [ConnectionService, ConnectionFactory],
  exports: [ConnectionService],
})
export class ConnectionModule {}
