import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CentralAreaAuth from '@/components/main-page/CentralAreaAuth';
import { renderWithProviders } from '@/__tests__/setupTests';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

describe('CentralAreaAuth Component', () => {
  it('renders the component without crashing', () => {
    renderWithProviders(<CentralAreaAuth email="test@example.com" />);
    expect(
      screen.getByRole('heading', { name: /welcomeBack/i })
    ).toBeInTheDocument();
  });

  it('displays the welcome back message with email', () => {
    renderWithProviders(<CentralAreaAuth email="user@test.com" />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('welcomeBackuser@test.com !');
  });

  it('handles null email', () => {
    renderWithProviders(<CentralAreaAuth email={null} />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('welcomeBack !');
  });

  it('handles undefined email', () => {
    renderWithProviders(<CentralAreaAuth email={undefined} />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('welcomeBack !');
  });

  it('applies responsive styles (basic check)', () => {
    renderWithProviders(<CentralAreaAuth email="test@example.com" />);
    const container = document.querySelector('.MuiContainer-root');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('MuiContainer-maxWidthSm');
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('MuiTypography-h3');
  });
});
