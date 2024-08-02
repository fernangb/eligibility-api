import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { EligibilityService } from './eligibility.service';
import { CustomerConsumptionClassService } from '../../../application/customer-consumption-classes/services/customer-consumption-class.service';
import { TariffModalityService } from '../../../application/tariff-modalities/services/tariff-modality.service';
import { ConnectionService } from '../../../application/connections/services/connection.service';
import {
  ValidateEligibilityRequestDto,
  ValidateEligibilityResponseDto,
} from '../dtos/validate-eligibility.dto';
import { CustomerConsumptionClassEnum } from '../../../domain/customer-consumption-classes/enums/customer-consumption-class.enum';
import { TariffModalityEnum } from '../../../domain/tariff-modalities/enums/tariff-modality.enum';
import { IneligibilityReasonEnum } from '../../../domain/eligibilities/dtos/ineligibility-reason.enum';
import { createMock } from '@golevelup/ts-jest';

describe('Eligibility Service', () => {
  let service: EligibilityService;
  let customerConsumptionClassService: CustomerConsumptionClassService;
  let tariffModalityService: TariffModalityService;
  let connectionService: ConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EligibilityService,
        CustomerConsumptionClassService,
        TariffModalityService,
        {
          provide: ConnectionService,
          useValue: createMock<ConnectionService>(),
        },
      ],
    }).compile();

    service = module.get<EligibilityService>(EligibilityService);
    customerConsumptionClassService =
      module.get<CustomerConsumptionClassService>(
        CustomerConsumptionClassService,
      );
    tariffModalityService = module.get<TariffModalityService>(
      TariffModalityService,
    );
    connectionService = module.get<ConnectionService>(ConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should return inegibility if customer consumption class is invalid', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.RURAL,
        modalidadeTarifaria: TariffModalityEnum.WHITE,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [1000, 2000, 3000, 4000],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: false,
        razoesDeInelegibilidade: [
          IneligibilityReasonEnum.INVALID_CUSTOMER_CONSUMPTION_CLASS,
        ],
      } as ValidateEligibilityResponseDto;

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(false);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(true);
      jest.spyOn(connectionService, 'validate').mockReturnValue(true);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });

    it('should return inegibility if tariff modality is invalid', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [1000, 2000, 3000, 400],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: false,
        razoesDeInelegibilidade: [
          IneligibilityReasonEnum.INVALID_TARIFF_MODALITY,
        ],
      } as ValidateEligibilityResponseDto;

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(true);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(false);
      jest.spyOn(connectionService, 'validate').mockReturnValue(true);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });

    it('should return inegibility if consumption value is invalid', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.WHITE,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [1, 2, 3, 4],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: false,
        razoesDeInelegibilidade: [
          IneligibilityReasonEnum.INVALID_CONSUMPTION_VALUE,
        ],
      } as unknown as ValidateEligibilityResponseDto;

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(true);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(true);
      jest.spyOn(connectionService, 'validate').mockReturnValue(false);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });

    it('should return inegibility if customer consumption class and tariff modality are invalid', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.RURAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [1000, 2000, 3000, 4000],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: false,
        razoesDeInelegibilidade: [
          IneligibilityReasonEnum.INVALID_CUSTOMER_CONSUMPTION_CLASS,
          IneligibilityReasonEnum.INVALID_TARIFF_MODALITY,
        ],
      } as ValidateEligibilityResponseDto;

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(false);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(false);
      jest.spyOn(connectionService, 'validate').mockReturnValue(true);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });

    it('should return inegibility if customer consumption class and value are invalid', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.RURAL,
        modalidadeTarifaria: TariffModalityEnum.WHITE,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [1, 2, 43, 4],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: false,
        razoesDeInelegibilidade: [
          IneligibilityReasonEnum.INVALID_CUSTOMER_CONSUMPTION_CLASS,
          IneligibilityReasonEnum.INVALID_CONSUMPTION_VALUE,
        ],
      } as ValidateEligibilityResponseDto;

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(false);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(true);
      jest.spyOn(connectionService, 'validate').mockReturnValue(false);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });

    it('should return inegibility if tariff modality and consumption value are invalid', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [1, 2, 43, 4],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: false,
        razoesDeInelegibilidade: [
          IneligibilityReasonEnum.INVALID_TARIFF_MODALITY,
          IneligibilityReasonEnum.INVALID_CONSUMPTION_VALUE,
        ],
      } as ValidateEligibilityResponseDto;

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(true);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(false);
      jest.spyOn(connectionService, 'validate').mockReturnValue(false);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });

    it('should return inegibility if customer consumption class, tariff modality and consumption value are invalid', () => {
      const props = {
        classeDeConsumo: CustomerConsumptionClassEnum.RURAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.BIPHASIC,
        historicoDeConsumo: [1, 2, 43, 4],
      } as ValidateEligibilityRequestDto;

      const response = {
        elegivel: false,
        razoesDeInelegibilidade: [
          IneligibilityReasonEnum.INVALID_CUSTOMER_CONSUMPTION_CLASS,
          IneligibilityReasonEnum.INVALID_TARIFF_MODALITY,
          IneligibilityReasonEnum.INVALID_CONSUMPTION_VALUE,
        ],
      } as ValidateEligibilityResponseDto;

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(false);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(false);
      jest.spyOn(connectionService, 'validate').mockReturnValue(false);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });

    it('should return egibility if consumption value is valid', () => {
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

      jest
        .spyOn(customerConsumptionClassService, 'validate')
        .mockReturnValue(true);
      jest.spyOn(tariffModalityService, 'validate').mockReturnValue(true);
      jest.spyOn(connectionService, 'validate').mockReturnValue(true);

      expect(service.validate(props)).toStrictEqual(response);
      expect(customerConsumptionClassService.validate).toHaveBeenCalled();
      expect(tariffModalityService.validate).toHaveBeenCalled();
      expect(connectionService.validate).toHaveBeenCalled();
    });
  });
});
