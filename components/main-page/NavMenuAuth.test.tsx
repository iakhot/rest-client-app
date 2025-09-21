import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import NavMenuAuth from './NavMenuAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useMediaQuery } from '@mui/material';
import { usePathname } from '@/i18n/navigation';
import sidebarInitTab from '@/service/sidebarInitTab';
import { renderWithProviders } from '@/__tests__/setupTests';

type MockTabsProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  onChange?: (_event: React.SyntheticEvent, _value: number) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: string;
  'aria-label'?: string;
  sx?: object;
};

type MockTabProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string;
  component?: React.ComponentType<unknown>;
};

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@mui/material', () => ({
  Tab: ({ children, label, ...props }: MockTabProps) => (
    <div
      role="tab"
      aria-label={label || (typeof children === 'string' ? children : '')}
      {...props}
    >
      {children}
    </div>
  ),
  Tabs: ({ children, ...props }: MockTabsProps) => (
    <div role="tablist" {...props}>
      {children}
    </div>
  ),
  useMediaQuery: vi.fn(),
  useTheme: vi.fn(() => ({ breakpoints: { up: vi.fn(() => true) } })),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('@/firebase/config', () => ({
  auth: {},
}));

vi.mock('@/service/sidebarInitTab', () => ({
  default: vi.fn(),
}));

describe('NavMenuAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation tabs correctly', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);
    vi.mocked(useMediaQuery).mockReturnValue(true);
    vi.mocked(usePathname).mockReturnValue('/main');
    vi.mocked(sidebarInitTab).mockReturnValue(0);

    renderWithProviders(<NavMenuAuth />, { locale: 'en' });

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Main/i })).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: /REST Client/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /History/i })).toBeInTheDocument();
  });

  it('handles different screen sizes', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);
    vi.mocked(useMediaQuery).mockReturnValue(false);
    vi.mocked(usePathname).mockReturnValue('/client');
    vi.mocked(sidebarInitTab).mockReturnValue(1);

    renderWithProviders(<NavMenuAuth />, { locale: 'en' });

    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
