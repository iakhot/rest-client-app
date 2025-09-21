import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import Details from '@/components/history-accordion/details';
import { mockHistory } from '@/__tests__/mocks';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}));

describe('Details component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all fields from history item', async () => {
    render(await Details({ historyItem: mockHistory }));

    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('duration100ms')).toBeInTheDocument();
    expect(screen.getByText('requestSize100B')).toBeInTheDocument();
    expect(screen.getByText('responseSize100B')).toBeInTheDocument();
    expect(screen.getByText('errorDetailsOk')).toBeInTheDocument();
  });
});
