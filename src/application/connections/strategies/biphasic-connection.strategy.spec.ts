import { BiphasicConnectionStrategy } from './biphasic-connection.strategy';

describe('Biphasic Connection Strategy', () => {
  let strategy: BiphasicConnectionStrategy;

  beforeEach(() => {
    strategy = new BiphasicConnectionStrategy();
  });

  it('should return false if average is lesser than minimum value', () => {
    const average = 499;

    expect(strategy.validate(average)).toEqual(false);
  });

  it('should return true if average is equal than minimum value', () => {
    const average = 500;

    expect(strategy.validate(average)).toEqual(true);
  });

  it('should return true if average is bigger than minimum value', () => {
    const average = 501;

    expect(strategy.validate(average)).toEqual(true);
  });
});
