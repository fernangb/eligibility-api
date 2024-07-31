import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { CustomerConsumptionClassEnum } from '../../../domain/customer-consumption-classes/enums/customer-consumption-class.enum';
import { DocumentVO } from '../../../domain/shared/value-objects/document.vo';
import { TariffModalityEnum } from '../../../domain/tariff-modalities/enums/tariff-modality.enum';
import { InvalidConsumptionHistoryPeriodException } from '../exceptions/invalid-consumption-history-period.exception';
import { InvalidConsumptionHistoryValueException } from '../exceptions/invalid-consumption-history-value.exception';

export interface EligibilityEntityProps {
  numeroDoDocumento: string;
  tipoDeConexao: ConnectionTypeEnum;
  classeDeConsumo: CustomerConsumptionClassEnum;
  modalidadeTarifaria: TariffModalityEnum;
  historicoDeConsumo: number[];
}

export class EligibilityEntity {
  numeroDoDocumento: string;
  tipoDeConexao: ConnectionTypeEnum;
  classeDeConsumo: CustomerConsumptionClassEnum;
  modalidadeTarifaria: TariffModalityEnum;
  historicoDeConsumo: number[];

  constructor(props: EligibilityEntityProps) {
    this.numeroDoDocumento = new DocumentVO(props.numeroDoDocumento).value;
    this.tipoDeConexao = props.tipoDeConexao;
    this.classeDeConsumo = props.classeDeConsumo;
    this.modalidadeTarifaria = props.modalidadeTarifaria;
    this.historicoDeConsumo = props.historicoDeConsumo;

    this.validate();
  }

  private validate() {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 12;
    const MIN_VALUE = 0;
    const MAX_VALUE = 9999;

    if (
      this.historicoDeConsumo.length < MIN_LENGTH ||
      this.historicoDeConsumo.length > MAX_LENGTH
    )
      throw new InvalidConsumptionHistoryPeriodException();

    this.historicoDeConsumo.forEach((value) => {
      if (value < MIN_VALUE || value > MAX_VALUE)
        throw new InvalidConsumptionHistoryValueException();
    });
  }
}
