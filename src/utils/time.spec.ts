import { describe, expect, it } from 'vitest';

import { time } from '@/utils/time';

describe('time', () => {
  it('should format time correctly', () => {
    expect(time('12:34:56').format()).toBe('12:34:56');
  });
  it('should format time where hours are more than 24', () => {
    expect(time('25:34:56').format()).toBe('25:34:56');
    expect(time('24:00:00').format()).toBe('24:00:00');
    expect(time('48:00:00').format()).toBe('48:00:00');
    expect(time('100:00:00').format()).toBe('100:00:00');
  });
  it('should format time with only minutes and seconds', () => {
    expect(time('34:56').format('hh:mm:ss')).toBe('00:34:56');
  });
  it('should format time with only seconds', () => {
    expect(time('56').format('hh:mm:ss')).toBe('00:00:56');
  });
  it('should throw an error for invalid time format', () => {
    expect(() => time('invalid')).toThrow('Invalid time format: invalid');
  });
  it('should throw an error for negative time values', () => {
    expect(() => time('-12:34:56')).toThrow(
      'Negative time values are not allowed: -12:34:56',
    );
  });
  it('should handle only seconds in input and convert to hours, minutes, seconds', () => {
    const result = time('3661');
    expect(result.hours).toBe(1);
    expect(result.minutes).toBe(1);
    expect(result.seconds).toBe(1);
    expect(result.format()).toBe('01:01:01');
  });
  it('should handle input without leading zeros', () => {
    const result = time('1:2:3');
    expect(result.hours).toBe(1);
    expect(result.minutes).toBe(2);
    expect(result.seconds).toBe(3);
    expect(result.format()).toBe('01:02:03');
  });
  it('should handle values greater than 24 hours, 60 minutes, and 60 seconds', () => {
    const result = time('25:61:61');
    expect(result.hours).toBe(26);
    expect(result.minutes).toBe(2);
    expect(result.seconds).toBe(1);
    expect(result.format()).toBe('26:02:01');
  });
  it('should handle floats and scientific notation', () => {
    expect(time('1.123:1.5e0').format()).toBe('01:02');
  });
  it('should handle leading zeros in input', () => {
    const result = time('01:02:03');
    expect(result.format()).toBe('01:02:03');
  });
  it('should handle input with only seconds and no leading zeros', () => {
    const result = time('59');
    expect(result.format()).toBe('59 sekunder');
  });
  it('should handle input with only minutes and seconds', () => {
    const result = time('2:30');
    expect(result.format()).toBe('02:30');
  });
  it('should handle auto format, where if hours or minutes are zero, they are not shown', () => {
    expect(time('0:30:45').format()).toBe('30:45');
    expect(time('0:0:45').format()).toBe('45 sekunder');
    expect(time('1:0:0').format()).toBe('01:00:00');
    expect(time('0:1:0').format()).toBe('01:00');
    expect(time('0:0:1').format()).toBe('ett sekund');
  });
  it('should throw an error for unknown format option', () => {
    expect(() => time('12:34:56').format('unknown' as any)).toThrow(
      'Unknown format option: unknown',
    );
  });
  it('should throw on gibberish input', () => {
    expect(() => time('gibberish').format()).toThrow(
      'Invalid time format: gibberish',
    );
    expect(() => time('12:34:gibberish').format()).toThrow(
      'Invalid time format: 12:34:gibberish',
    );
    expect(() => time('12:gibberish:56').format()).toThrow(
      'Invalid time format: 12:gibberish:56',
    );
    expect(() => time('gibberish:34:56').format()).toThrow(
      'Invalid time format: gibberish:34:56',
    );
    expect(() => time('12:34:56:gibberish').format()).toThrow(
      'Invalid time format: 12:34:56:gibberish',
    );
  });
  it('should handle scientific notation for seconds', () => {
    expect(time('1.5e6').format()).toBe('416:40:00');
    expect(time('1.5e5').format()).toBe('41:40:00');
    expect(time('1.5e4').format()).toBe('04:10:00');
    expect(time('1.5e3').format()).toBe('25:00');
    expect(time('1.5e2').format()).toBe('02:30');
    expect(time('1.5e1').format()).toBe('15 sekunder');
    expect(time('1.5e0').format()).toBe('2 sekunder');
    expect(time('1.5e-1').format()).toBe('0 sekunder');
  });
  it('should pretty print time', () => {
    expect(time('1:2:3').format('pretty')).toBe('en time og 2 minutter');
    expect(time('0:2:3').format('pretty')).toBe('2 minutter og 3 sekunder');
    expect(time('0:0:3').format('pretty')).toBe('3 sekunder');
    expect(time('1:0:0').format('pretty')).toBe('en time');
    expect(time('0:1:0').format('pretty')).toBe('ett minutt');
    expect(time('0:0:1').format('pretty')).toBe('ett sekund');
  });
});
