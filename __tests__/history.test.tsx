import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import History from '@/app/[lang]/(clientPages)/history/page';
import { getHistory } from '@/app/dbActions';
import { redirect } from 'next/navigation';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(() => {
    throw new Error('redirect called');
  }),
}));

vi.mock('@/app/dbActions', () => ({
  getHistory: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}));

describe('History page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects if userId is missing', async () => {
    const searchParams = Promise.resolve({});
    await expect(History({ searchParams })).rejects.toThrow('redirect called');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('renders "No history available" if history is empty', async () => {
    const searchParams = Promise.resolve({ user: '123' });
    vi.mocked(getHistory).mockResolvedValue([]);
    render(await History({ searchParams }));
    expect(screen.getByText('No history available')).toBeInTheDocument();
  });
});
