import { Body, Controller, Post } from '@nestjs/common';
import {
  ValidateEligibilityRequestDto,
  ValidateEligibilityResponseDto,
} from '../dtos/validate-eligibility.dto';
import { EligibilityService } from '../services/eligibility.service';

@Controller('eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @Post()
  async validate(
    @Body() dto: ValidateEligibilityRequestDto,
  ): Promise<ValidateEligibilityResponseDto> {
    return this.eligibilityService.validate(dto);
  }
}