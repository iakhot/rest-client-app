import { screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest';
import { useAuthState } from 'react-firebase-hooks/auth';
import { renderWithProviders } from './setupTests';
import HomeAuth from '@/app/[lang]/(clientPages)/main/page';

vi.mock('@/firebase/config', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
  },
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}));

const uuid = crypto.randomUUID();
const userStub = {
  uid: uuid,
  email: 'John.Doe@fake.com',
};

describe('Main page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', async () => {
    (useAuthState as Mock).mockReturnValue([userStub]);
    renderWithProviders(<HomeAuth />);
    expect(
      screen.getByText(/welcome back, John.Doe@fake.com !/i)
    ).toBeInTheDocument();
  });
});
