import { Injectable } from '@nestjs/common';
import {
  ValidateEligibilityRequestDto,
  ValidateEligibilityResponseDto,
} from '../dtos/validate-eligibility.dto';
import { CustomerConsumptionClassService } from '../../customer-consumption-classes/services/customer-consumption-class.service';
import { TariffModalityService } from '../../tariff-modalities/services/tariff-modality.service';
import { ConnectionService } from '../../connections/services/connection.service';
import { IneligibilityReasonEnum } from '../../../domain/eligibilities/dtos/ineligibility-reason.enum';
import { EligibilityEntity } from '../../../domain/eligibilities/entities/eligibility.entity';

@Injectable()
export class EligibilityService {
  constructor(
    private customerConsumptionClassService: CustomerConsumptionClassService,
    private tariffModalityService: TariffModalityService,
    private connectionService: ConnectionService,
  ) {}

  validate(
    props: ValidateEligibilityRequestDto,
  ): ValidateEligibilityResponseDto {
    const inegibilityReasons: IneligibilityReasonEnum[] = [];

    const eligibility = new EligibilityEntity({
      classeDeConsumo: props.classeDeConsumo,
      historicoDeConsumo: props.historicoDeConsumo,
      modalidadeTarifaria: props.modalidadeTarifaria,
      numeroDoDocumento: props.numeroDoDocumento,
      tipoDeConexao: props.tipoDeConexao,
    });

    const isCustomerConsumptionClassValid =
      this.customerConsumptionClassService.validate(
        eligibility.classeDeConsumo,
      );

    if (!isCustomerConsumptionClassValid)
      inegibilityReasons.push(
        IneligibilityReasonEnum.INVALID_CUSTOMER_CONSUMPTION_CLASS,
      );

    const isTariffModalityValid = this.tariffModalityService.validate(
      eligibility.modalidadeTarifaria,
    );

    if (!isTariffModalityValid)
      inegibilityReasons.push(IneligibilityReasonEnum.INVALID_TARIFF_MODALITY);

    const isValidConsumption = this.connectionService.validate(
      eligibility.historicoDeConsumo,
      eligibility.tipoDeConexao,
    );

    if (!isValidConsumption)
      inegibilityReasons.push(
        IneligibilityReasonEnum.INVALID_CONSUMPTION_VALUE,
      );

    if (inegibilityReasons.length > 0)
      return {
        elegivel: false,
        razoesDeInelegibilidade: inegibilityReasons,
      };

    return {
      elegivel: true,
      economiaAnualDeCO2: this.getAnnualCO2Savings(
        eligibility.historicoDeConsumo,
      ),
    };
  }

  private getAnnualCO2Savings(items: number[]): number {
    const REFERENCE_WEIGHT = 84;
    const REFERENCE_KW = 1000;

    const sum = items.reduce((acc, value) => acc + value, 0);

    return (REFERENCE_WEIGHT * sum) / REFERENCE_KW;
  }
}
