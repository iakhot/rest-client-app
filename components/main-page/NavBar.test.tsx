import React from 'react';
import { screen } from '@testing-library/react';
import NavBar from './NavBar';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '@/__tests__/setupTests';

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const dict = {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
    };
    return (textKey: 'signIn' | 'signUp' | 'signOut') => dict[textKey];
  },
  useLocale: () => 'en',
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/',
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, undefined],
  useSignOut: () => [vi.fn(), false, undefined],
}));

vi.mock('@/firebase/config', () => ({
  auth: {},
}));

describe('NavBar', () => {
  it('renders correctly and displays navigation and language buttons', () => {
    renderWithProviders(<NavBar />);

    const ruButtons = screen.getAllByRole('button', { name: /RU/i });
    expect(ruButtons.length).toBeGreaterThanOrEqual(1);

    const enButtons = screen.getAllByRole('button', { name: /EN/i });
    expect(enButtons.length).toBeGreaterThanOrEqual(1);

    const signInButtons = screen.getAllByText(/Sign In/i);
    expect(signInButtons[0]).toBeInTheDocument();

    const signUpButtons = screen.getAllByText(/Sign Up/i);
    expect(signUpButtons[0]).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
  });
});
