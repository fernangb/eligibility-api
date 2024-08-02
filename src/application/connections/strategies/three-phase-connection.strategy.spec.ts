import { ThreePhaseConnectionStrategy } from './three-phase-connection.strategy';

describe('Three Phase Connection Strategy', () => {
  let strategy: ThreePhaseConnectionStrategy;

  beforeEach(() => {
    strategy = new ThreePhaseConnectionStrategy();
  });

  it('should return false if average is lesser than minimum value', () => {
    const average = 749;

    expect(strategy.validate(average)).toEqual(false);
  });

  it('should return true if average is equal than minimum value', () => {
    const average = 750;

    expect(strategy.validate(average)).toEqual(true);
  });

  it('should return true if average is bigger than minimum value', () => {
    const average = 751;

    expect(strategy.validate(average)).toEqual(true);
  });
});
