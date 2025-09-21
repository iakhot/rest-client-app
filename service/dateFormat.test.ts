import { describe, expect, it } from 'vitest';
import { dateFormat } from './dateFormat';

describe('dateFormat', () => {
  it('formats timestamp to ru-RU date string', () => {
    const result = dateFormat(1758465276478);
    expect(typeof result).toBe('string');
    expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}/);
  });
});
