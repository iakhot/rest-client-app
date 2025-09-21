import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import Summary from '@/components/history-accordion/summary';
import { mockHistory } from '@/__tests__/mocks';

vi.mock('@/service/dateFormat', () => ({
  dateFormat: vi.fn(() => '2025-09-21 12:00:00'),
}));

vi.mock('@/service/urlUtils', () => ({
  composeUrl: vi.fn(() => '/mocked/url'),
}));

vi.mock('@/components/common/GetLink', () => ({
  default: ({ name }: { name: string }) => (
    <span data-testid="get-link">{name}</span>
  ),
}));

describe('Summary component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all fields from history item', () => {
    render(<Summary historyItem={mockHistory} index={0} />);
    expect(screen.getByText('2025-09-21 12:00:00')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByTestId('get-link')).toHaveTextContent('/api/test');
  });
});
