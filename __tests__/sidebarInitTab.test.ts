import * as sidebarInitTab from '@/service/sidebarInitTab';
import { describe, expect, it } from 'vitest';

describe('UrlUtils test', () => {
  it('headersToString test', () => {
    const path = 'client/GET/endpoint';
    const result = sidebarInitTab.default(path);
    expect(result).toBe(1);
  });
});
