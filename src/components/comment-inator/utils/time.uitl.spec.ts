import formatTimeAgo from './time.util';

describe('Time Utils', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2023-04-04'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return relative time for today', () => {
    const givenTime = new Date('2023-04-04').valueOf();
    expect(formatTimeAgo(givenTime)).toEqual('now');
  });

  it('should return relative time for days', () => {
    const givenTime = new Date('2023-04-02').valueOf();
    expect(formatTimeAgo(givenTime)).toEqual('2 days ago');
  });

  it('should return relative time for weeks', () => {
    const givenTime = new Date('2023-03-10').valueOf();
    expect(formatTimeAgo(givenTime)).toEqual('4 weeks ago');
  });

  it('should return relative time for months', () => {
    const givenTime = new Date('2023-02-04').valueOf();
    expect(formatTimeAgo(givenTime)).toEqual('2 months ago');
  });

  it('should return relative time for years', () => {
    const givenTime = new Date('2022-04-04').valueOf();
    expect(formatTimeAgo(givenTime)).toEqual('12 months ago');
  });
});
