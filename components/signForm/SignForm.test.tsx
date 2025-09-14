import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SignForm from './SignForm';
import { renderWithProviders } from '@/__tests__/setupTests';

describe('SignForm for signing in', () => {
  it('renders correctly in English', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(
      <SignForm
        formType={'signIn'}
        required={true}
        handleSubmit={handleSubmit}
      />,
      { locale: 'en' }
    );

    expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute(
      'placeholder',
      expect.stringMatching(/your@email.com/i)
    );
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      'placeholder',
      '••••••'
    );
    expect(screen.getByRole('button')).toHaveTextContent(/sign in/i);
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(/sign up/i);
  });
  it('triggers sign in', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    const { user } = renderWithProviders(
      <SignForm
        formType={'signIn'}
        required={true}
        handleSubmit={handleSubmit}
      />,
      { locale: 'en' }
    );
    const emailVal = 'user@fake.com';
    const email = screen.getByLabelText(/email/i);
    expect(email).toHaveValue('');
    await user.type(email, emailVal);
    expect(email).toHaveValue(emailVal);

    const pwdVal = '1234@Abc';
    const pwd = screen.getByLabelText(/password/i);
    expect(pwd).toHaveValue('');
    await user.type(pwd, pwdVal);
    expect(pwd).toHaveValue(pwdVal);

    const signin = screen.getByRole('button', { name: /sign in/i });
    expect(signin).toBeInTheDocument();
    await user.click(signin);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
