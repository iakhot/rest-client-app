import { screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { renderWithProviders } from './setupTests';
import Error from '@/app/[lang]/error';

describe('Error page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', async () => {
    const errorStub = {
      name: 'Type error',
      message: 'Oops',
    };
    renderWithProviders(<Error error={errorStub} reset={vi.fn()} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });
});
