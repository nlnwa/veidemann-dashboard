import { timeToDuration } from "./datetime";

fdescribe('timeToDuration', () => {

  it('transforms 2000ms to 2s', () => {
    expect(timeToDuration(2000, 'ms')).toBe('2s');
  });

  it('transforms 10s to 10s', () => {
    expect(timeToDuration(10, 's')).toBe('10s');
  });

  it('transforms 70s to 1min:10s', () => {
    expect(timeToDuration(70, 's')).toBe('1min:10s');
  });

  it('transform 3671s to 1hour:1min:10s', () => {
    expect(timeToDuration(3671, 's')).toBe('1hour:1min:10s');
  });

  it('transform 93784s to 1day:2hour:3min:4s', () => {
    expect(timeToDuration(93784, 's')).toBe('1day:2hour:3min:4s');
  });
});
