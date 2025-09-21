import { screen } from '@testing-library/react';
import { describe, it, vi, expect, Mock } from 'vitest';
import { useAuthState } from 'react-firebase-hooks/auth';
import { renderWithProviders } from './setupTests';
import ClientLayout from '@/app/[lang]/(clientPages)/layout';
import { usePathname } from '@/i18n/navigation';

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

vi.mock('@/i18n/navigation', async () => {
  const actual = await vi.importActual('@/i18n/navigation');
  return {
    __esModule: true,
    ...actual,
    usePathname: vi.fn(),
  };
});

const uuid = crypto.randomUUID();
const userStub = {
  uid: uuid,
};

describe('ClientLayout', () => {
  it('renders correctly', async () => {
    (useAuthState as Mock).mockReturnValue([userStub]);
    vi.mocked(usePathname).mockReturnValue('/client');
    const params = Promise.resolve({ lang: 'en' });
    const children = <p>test</p>;
    renderWithProviders(await ClientLayout({ params, children }));

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Main/i })).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: /REST Client/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /History/i })).toBeInTheDocument();
  });
});
