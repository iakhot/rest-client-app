import * as urlUtil from '@/service/urlUtils';
import { describe, expect, it } from 'vitest';
import { mockHeaders } from './mocks';

describe('UrlUtils test', () => {
  it('headersToString test', () => {
    const input: Record<string, string> = {
      Accept: 'text/html',
    };
    const result = urlUtil.headersToString(input);
    expect(result).toMatch(/\?Accept=text%2Fhtml/i);
  });

  it('getHeaderPairs test', () => {
    const result = urlUtil.getHeaderPairs(mockHeaders);
    expect(result).toMatchObject({
      Accept: 'text/html',
      'Content-Type': 'image/png',
    });
  });
});
