import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  NotValidEligibilityDto,
  ValidateEligibilityRequestDto,
  ValidateEligibilityResponseDto,
  ValidEligibilityDto,
} from '../dtos/validate-eligibility.dto';
import { EligibilityService } from '../services/eligibility.service';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('eligibility')
@ApiTags('Eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @ApiOperation({ summary: 'Validate eligibility' })
  @ApiExtraModels(ValidEligibilityDto, NotValidEligibilityDto)
  @ApiResponse({
    description: 'Customer eligibility validated',
    status: 201,
    schema: {
      oneOf: [
        { $ref: getSchemaPath(ValidEligibilityDto) },
        { $ref: getSchemaPath(NotValidEligibilityDto) },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: BadRequestException,
    example: {
      statusCode: 400,
      message: 'Documento inválido',
      error: 'Bad Request',
    },
  })
  @Post()
  validate(
    @Body() dto: ValidateEligibilityRequestDto,
  ): ValidateEligibilityResponseDto {
    return this.eligibilityService.validate(dto);
  }
}
