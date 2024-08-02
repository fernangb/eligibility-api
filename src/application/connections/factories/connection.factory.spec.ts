import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { BiphasicConnectionStrategy } from '../strategies/biphasic-connection.strategy';
import { SinglePhaseConnectionStrategy } from '../strategies/single-phase-connection.strategy';
import { ThreePhaseConnectionStrategy } from '../strategies/three-phase-connection.strategy';
import { ConnectionFactory } from './connection.factory';

describe('Connection Factory', () => {
  let factory: ConnectionFactory;

  beforeEach(() => {
    factory = new ConnectionFactory();
  });

  describe('getStrategy', () => {
    it('should return a single phase connection strategy', () => {
      const type = ConnectionTypeEnum.SINGLE_PHASE;

      const response = new SinglePhaseConnectionStrategy();

      expect(factory.getStrategy(type)).toStrictEqual(response);
    });

    it('should return a biphasic connection strategy', () => {
      const type = ConnectionTypeEnum.BIPHASIC;

      const response = new BiphasicConnectionStrategy();

      expect(factory.getStrategy(type)).toStrictEqual(response);
    });

    it('should return a three phase connection strategy', () => {
      const type = ConnectionTypeEnum.THREE_PHASE;

      const response = new ThreePhaseConnectionStrategy();

      expect(factory.getStrategy(type)).toStrictEqual(response);
    });

    it('should throw error if connection is invalid', () => {
      const type = 'invalid' as ConnectionTypeEnum;

      expect(() => {
        factory.getStrategy(type);
      }).toThrow('Tipo de conexão inválida');
    });
  });
});
