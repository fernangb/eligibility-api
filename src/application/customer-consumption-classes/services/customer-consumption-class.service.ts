import { Injectable } from '@nestjs/common';
import { CustomerConsumptionClassEnum } from '../../../domain/customer-consumption-classes/enums/customer-consumption-class.enum';

@Injectable()
export class CustomerConsumptionClassService {
  validate(customerConsumptionClass: CustomerConsumptionClassEnum): boolean {
    const validCustomerConsumptionClasses: CustomerConsumptionClassEnum[] = [
      CustomerConsumptionClassEnum.COMMERCIAL,
      CustomerConsumptionClassEnum.RESIDENTIAL,
      CustomerConsumptionClassEnum.INDUSTRIAL,
    ];

    return validCustomerConsumptionClasses.includes(customerConsumptionClass);
  }
}
