import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { CustomerConsumptionClassEnum } from '../../../domain/customer-consumption-classes/enums/customer-consumption-class.enum';
import { TariffModalityEnum } from '../../../domain/tariff-modalities/enums/tariff-modality.enum';
import { EligibilityEntity } from './eligibility.entity';

describe('Eligibility Entity', () => {
  it('should throw error if consumption history is lesser than minimum period', () => {
    expect(() => {
      new EligibilityEntity({
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.SINGLE_PHASE,
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        historicoDeConsumo: [1, 2],
      });
    }).toThrow('Histórico de consumo com período inválido');
  });

  it('should throw error if consumption history is bigger than maximum periodo', () => {
    expect(() => {
      new EligibilityEntity({
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.SINGLE_PHASE,
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        historicoDeConsumo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      });
    }).toThrow('Histórico de consumo com período inválido');
  });

  it('should throw error if consumption history is lesser than minimum value', () => {
    expect(() => {
      new EligibilityEntity({
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.SINGLE_PHASE,
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        historicoDeConsumo: [-1, 2, 3, 4, 5, 6, 7, 8, 9],
      });
    }).toThrow('Histórico de consumo com valor inválido');
  });

  it('should throw error if consumption history is lesser than minimum value', () => {
    expect(() => {
      new EligibilityEntity({
        numeroDoDocumento: '12345678900',
        tipoDeConexao: ConnectionTypeEnum.SINGLE_PHASE,
        classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
        modalidadeTarifaria: TariffModalityEnum.GREEN,
        historicoDeConsumo: [1, 2, 10000, 4, 5],
      });
    }).toThrow('Histórico de consumo com valor inválido');
  });

  it('should create a valid eligibility', () => {
    const eligibility = new EligibilityEntity({
      numeroDoDocumento: '12345678900',
      tipoDeConexao: ConnectionTypeEnum.SINGLE_PHASE,
      classeDeConsumo: CustomerConsumptionClassEnum.COMMERCIAL,
      modalidadeTarifaria: TariffModalityEnum.GREEN,
      historicoDeConsumo: [1, 2, 3, 4, 5],
    });

    expect(eligibility).toBeDefined();
  });
});
