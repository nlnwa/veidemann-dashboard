import { timeToDuration } from "./datetime";

// TODO: Fix formatting to be more on point
describe('timeToDuration', () => {

  it('transforms 10 to 10s', () => {
    expect(timeToDuration(10, 's')).toBe('0days:0hours:00min:10s');
  });

  it('transforms 70 to 1min:10s', () => {
    expect(timeToDuration(70, 's')).toBe('0days:0hours:01min:10s');
  });

  it('transforms 31536000 s to 1 year', () => {
    expect(timeToDuration(31536000, 's')).toBe('0days:0hours:00min:00s');
  });

  it('transforms 100 ms to 100ms', () => {
    expect(timeToDuration(100, 'ms')).toBe('0days:0hours:00min:00s:100ms');
  });

  it('transforms 2000 ms to 2s', () => {
    expect(timeToDuration(2000, 'ms')).toBe('0days:0hours:00min:02s:000ms');
  });

});
