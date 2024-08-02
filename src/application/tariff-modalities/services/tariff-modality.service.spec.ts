import { Test, TestingModule } from '@nestjs/testing';
import { TariffModalityService } from './tariff-modality.service';
import { TariffModalityEnum } from '../../../domain/tariff-modalities/enums/tariff-modality.enum';

describe('Tariff Modality Service', () => {
  let service: TariffModalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TariffModalityService],
    }).compile();

    service = module.get<TariffModalityService>(TariffModalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should return false if tariff modality is blue', () => {
      const tariffModality = TariffModalityEnum.BLUE;

      expect(service.validate(tariffModality)).toBe(false);
    });

    it('should return false if tariff modality is green', () => {
      const tariffModality = TariffModalityEnum.GREEN;

      expect(service.validate(tariffModality)).toBe(false);
    });

    it('should return true if tariff modality is conventional', () => {
      const tariffModality = TariffModalityEnum.CONVENTIONAL;

      expect(service.validate(tariffModality)).toBe(true);
    });

    it('should return true if tariff modality is white', () => {
      const tariffModality = TariffModalityEnum.WHITE;

      expect(service.validate(tariffModality)).toBe(true);
    });
  });
});
