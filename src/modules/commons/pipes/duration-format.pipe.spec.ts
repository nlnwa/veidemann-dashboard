import {DurationFormatPipe} from './duration-format.pipe';

describe('DurationFormatPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  // TODO: Would be better to test the datetime-function.
  const pipe = new DurationFormatPipe();

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

});
