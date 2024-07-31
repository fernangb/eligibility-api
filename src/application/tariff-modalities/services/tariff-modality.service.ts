import { Injectable } from '@nestjs/common';
import { TariffModalityEnum } from 'src/domain/tariff-modalities/enums/tariff-modality.enum';

@Injectable()
export class TariffModalityService {
  validate(tariffModality: TariffModalityEnum): boolean {
    const validTariffModalities: TariffModalityEnum[] = [
      TariffModalityEnum.CONVENTIONAL,
      TariffModalityEnum.WHITE,
    ];

    return validTariffModalities.includes(tariffModality);
  }
}

//- Possíveis Valores: Comercial, Residencial, Industrial, Poder Público, e Rural.
//- Elegíveis: Comercial, Residencial e Industrial.
