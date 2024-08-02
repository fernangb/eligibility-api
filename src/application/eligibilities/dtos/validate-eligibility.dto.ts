import { ApiProperty } from '@nestjs/swagger';
import { ConnectionTypeEnum } from '../../../domain/connections/enums/connection-type.enum';
import { CustomerConsumptionClassEnum } from '../../../domain/customer-consumption-classes/enums/customer-consumption-class.enum';
import { IneligibilityReasonEnum } from '../../../domain/eligibilities/dtos/ineligibility-reason.enum';
import { TariffModalityEnum } from '../../../domain/tariff-modalities/enums/tariff-modality.enum';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class ValidateEligibilityRequestDto {
  @ApiProperty({
    description: 'Customer document number',
    example: '12345678900',
  })
  @IsString()
  numeroDoDocumento: string;

  @ApiProperty({
    description: 'Connection type',
    example: ConnectionTypeEnum.BIPHASIC,
    enum: ConnectionTypeEnum,
  })
  @IsString()
  tipoDeConexao: ConnectionTypeEnum;

  @ApiProperty({
    description: 'Customer consumption class',
    example: CustomerConsumptionClassEnum.COMMERCIAL,
    enum: CustomerConsumptionClassEnum,
  })
  @IsString()
  classeDeConsumo: CustomerConsumptionClassEnum;

  @ApiProperty({
    description: 'Tariff modality',
    example: TariffModalityEnum.CONVENTIONAL,
    enum: TariffModalityEnum,
  })
  @IsString()
  modalidadeTarifaria: TariffModalityEnum;

  @ApiProperty({
    description: 'Consumption history',
    example: [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ],
    minItems: 3,
    maxItems: 12,
  })
  @IsArray()
  historicoDeConsumo: number[];
}

export type ValidateEligibilityResponseDto =
  | ValidEligibilityDto
  | NotValidEligibilityDto;

export class ValidEligibilityDto {
  @ApiProperty({ description: 'Customer is eligible', example: true })
  @IsBoolean()
  elegivel: true;

  @ApiProperty({ description: 'Annual CO2 savings', example: 567 })
  @IsNumber()
  economiaAnualDeCO2: number;
}

export class NotValidEligibilityDto {
  @ApiProperty({ description: 'Customer is not eligible', example: false })
  @IsBoolean()
  elegivel: false;

  @ApiProperty({
    description: 'Inegibility reasons',
    example: [IneligibilityReasonEnum.INVALID_TARIFF_MODALITY],
    enum: IneligibilityReasonEnum,
  })
  @IsArray()
  razoesDeInelegibilidade: IneligibilityReasonEnum[];
}
