import { Test, TestingModule } from '@nestjs/testing';
import { CustomerConsumptionClassEnum } from '../../../domain/customer-consumption-classes/enums/customer-consumption-class.enum';
import { CustomerConsumptionClassService } from './customer-consumption-class.service';

describe('Customer Consumption Class Service', () => {
  let service: CustomerConsumptionClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerConsumptionClassService],
    }).compile();

    service = module.get<CustomerConsumptionClassService>(
      CustomerConsumptionClassService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should return false if customer consumption class is public authorities', () => {
      const customerConsumptionClass =
        CustomerConsumptionClassEnum.PUBLIC_AUTHORITIES;

      expect(service.validate(customerConsumptionClass)).toBe(false);
    });

    it('should return false if customer consumption class is rural', () => {
      const customerConsumptionClass = CustomerConsumptionClassEnum.RURAL;

      expect(service.validate(customerConsumptionClass)).toBe(false);
    });

    it('should return true if customer consumption class is commercial', () => {
      const customerConsumptionClass = CustomerConsumptionClassEnum.COMMERCIAL;

      expect(service.validate(customerConsumptionClass)).toBe(true);
    });

    it('should return true if customer consumption class is residential', () => {
      const customerConsumptionClass = CustomerConsumptionClassEnum.RESIDENTIAL;

      expect(service.validate(customerConsumptionClass)).toBe(true);
    });

    it('should return true if customer consumption class is industrial', () => {
      const customerConsumptionClass = CustomerConsumptionClassEnum.INDUSTRIAL;

      expect(service.validate(customerConsumptionClass)).toBe(true);
    });
  });
});
