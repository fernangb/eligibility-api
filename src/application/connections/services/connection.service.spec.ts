import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionService } from './connection.service';
import { ConnectionFactory } from '../factories/connection.factory';
import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { SinglePhaseConnectionStrategy } from '../strategies/single-phase-connection.strategy';

describe('Connection Service', () => {
  let service: ConnectionService;
  let factory: ConnectionFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionService, ConnectionFactory],
    }).compile();

    service = module.get<ConnectionService>(ConnectionService);
    factory = module.get<ConnectionFactory>(ConnectionFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should throw error if items are empty', () => {
      const items = [];
      const type = ConnectionTypeEnum.SINGLE_PHASE;

      expect(() => {
        service.validate(items, type);
      }).toThrow('Não é possível calcular a média');
    });

    it('should return false if average is invalid', () => {
      const items = [1, 2, 3, 4, 5];
      const type = ConnectionTypeEnum.SINGLE_PHASE;

      jest
        .spyOn(factory, 'getStrategy')
        .mockReturnValue(new SinglePhaseConnectionStrategy());

      expect(service.validate(items, type)).toBe(false);
      expect(factory.getStrategy).toHaveBeenCalled();
    });

    it('should return true if average is valid', () => {
      const items = [399, 400, 401, 402];
      const type = ConnectionTypeEnum.SINGLE_PHASE;

      jest
        .spyOn(factory, 'getStrategy')
        .mockReturnValue(new SinglePhaseConnectionStrategy());

      expect(service.validate(items, type)).toBe(true);
      expect(factory.getStrategy).toHaveBeenCalled();
    });
  });
});
