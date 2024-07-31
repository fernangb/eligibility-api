import { ConnectionTypeEnum } from 'src/domain/connections/enums/connection-type.enum';
import { CustomerConsumptionClassEnum } from 'src/domain/customer-consumption-classes/enums/customer-consumption-class.enum';
import { IneligibilityReasonEnum } from 'src/domain/eligibilities/dtos/ineligibility-reason.enum';
import { TariffModalityEnum } from 'src/domain/tariff-modalities/enums/tariff-modality.enum';

export class ValidateEligibilityRequestDto {
  numeroDoDocumento: string;
  tipoDeConexao: ConnectionTypeEnum;
  classeDeConsumo: CustomerConsumptionClassEnum;
  modalidadeTarifaria: TariffModalityEnum;
  historicoDeConsumo: number[];
}

export type ValidateEligibilityResponseDto =
  | ValidEligibilityDto
  | NotValidEligibilityDto;

export class ValidEligibilityDto {
  elegivel: true;
  economiaAnualDeCO2: number;
}

export class NotValidEligibilityDto {
  elegivel: false;
  razoesDeInelegibilidade: IneligibilityReasonEnum[];
}
