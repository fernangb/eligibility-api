import { SinglePhaseConnectionStrategy } from './single-phase-connection.strategy';

describe('Single Phase Connection Strategy', () => {
  let strategy: SinglePhaseConnectionStrategy;

  beforeEach(() => {
    strategy = new SinglePhaseConnectionStrategy();
  });

  it('should return false if average is lesser than minimum value', () => {
    const average = 399;

    expect(strategy.validate(average)).toEqual(false);
  });

  it('should return true if average is equal than minimum value', () => {
    const average = 400;

    expect(strategy.validate(average)).toEqual(true);
  });

  it('should return true if average is bigger than minimum value', () => {
    const average = 401;

    expect(strategy.validate(average)).toEqual(true);
  });
});
