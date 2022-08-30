import {dateToUtc} from './datetime';

describe('Date and time functions', () => {
  it('dateToUtc', () => {
    const ds = '19.10.1981';
    const got = dateToUtc(ds, false);
    expect(got).toBe('1981-10-18T23:59:59.999Z')
  });

/*
  it('transforms 10 to 10s', () => {
    expect(pipe.transform(10, 's')).toBe('10s');
  });

  it('transforms 70 to 1min:10s', () => {
    expect(pipe.transform(70, 's')).toBe('1min:10s');
  });

  it('transforms 31536000 s to 1 year', () => {
    expect(pipe.transform(31536000, 's')).toBe('365days');
  });

  it('transforms 100 ms to 100ms', () => {
    expect(pipe.transform(100, 'ms')).toBe('100ms');
  });

  it('transforms 2000 ms to 2s', () => {
    expect(pipe.transform(2000, 'ms')).toBe('2s');
  });
*/
});
