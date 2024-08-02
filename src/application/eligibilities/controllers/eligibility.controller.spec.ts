import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityController } from './eligibility.controller';
import { EligibilityService } from '../services/eligibility.service';
import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { CustomerConsumptionClassEnum } from '../../../domain/customer-consumption-classes/enums/customer-consumption-class.enum';
import { TariffModalityEnum } from '../../../domain/tariff-modalities/enums/tariff-modality.enum';
import {
  ValidateEligibilityRequestDto,
  ValidateEligibilityResponseDto,
} from '../dtos/validate-eligibility.dto';
import { createMock } from '@golevelup/ts-jest';

describe('Eligibility Controller', () => {
  let controller: EligibilityController;
  let service: EligibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EligibilityController,
        {
          provide: EligibilityService,
          useValue: createMock<EligibilityService>(),
        },
      ],
    }).compile();

    controller = module.get<EligibilityController>(EligibilityController);
    service = module.get<EligibilityService>(EligibilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('validate', () => {
    it('should validate eligibility', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.WHITE,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [750, 800, 850, 800],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: true,
        economiaAnualDeCO2: 268.8,
      } as unknown as ValidateEligibilityResponseDto;

      jest.spyOn(service, 'validate').mockReturnValue(response);

      expect(controller.validate(props)).toStrictEqual(response);
    });
  });
});
