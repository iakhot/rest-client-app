import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SignForm from './SignForm';
import { renderWithProviders } from '@/__tests__/setupTests';

describe('SignForm for signing in', () => {
  it('renders correctly in EN locale', () => {
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

  it('renders correctly in RU locale', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(
      <SignForm
        formType={'signIn'}
        required={true}
        handleSubmit={handleSubmit}
      />,
      { locale: 'ru' }
    );

    expect(screen.getByRole('heading')).toHaveTextContent(/Войти/i);
    expect(screen.getByLabelText(/Почта/i)).toHaveAttribute(
      'placeholder',
      expect.stringMatching(/your@email.com/i)
    );
    expect(screen.getByLabelText(/Пароль/i)).toHaveAttribute(
      'placeholder',
      '••••••'
    );
    expect(screen.getByRole('button')).toHaveTextContent(/Войти/i);
    expect(screen.getByText(/Еще нет аккаунта\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(/регистрация/i);
  });

  it('triggers "sign in" in EN locale', async () => {
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

  it('triggers "sign in" in RU locale', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    const { user } = renderWithProviders(
      <SignForm
        formType={'signIn'}
        required={true}
        handleSubmit={handleSubmit}
      />,
      { locale: 'ru' }
    );
    const emailVal = 'user@fake.com';
    const email = screen.getByLabelText(/почта/i);
    expect(email).toHaveValue('');
    await user.type(email, emailVal);
    expect(email).toHaveValue(emailVal);

    const pwdVal = '1234@Abc';
    const pwd = screen.getByLabelText(/пароль/i);
    expect(pwd).toHaveValue('');
    await user.type(pwd, pwdVal);
    expect(pwd).toHaveValue(pwdVal);

    const signin = screen.getByRole('button', { name: /войти/i });
    expect(signin).toBeInTheDocument();
    await user.click(signin);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});

describe('SignForm for signing up', () => {
  it('renders correctly in EN locale', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(
      <SignForm
        formType={'signUp'}
        required={false}
        handleSubmit={handleSubmit}
      />,
      { locale: 'en' }
    );

    expect(screen.getByRole('heading')).toHaveTextContent(/sign up/i);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute(
      'placeholder',
      expect.stringMatching(/your@email.com/i)
    );
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      'placeholder',
      '••••••'
    );
    expect(screen.getByRole('button')).toHaveTextContent(/sign up/i);
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(/sign in/i);
  });

  it('renders correctly in RU locale', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(
      <SignForm
        formType={'signUp'}
        required={false}
        handleSubmit={handleSubmit}
      />,
      { locale: 'ru' }
    );

    expect(screen.getByRole('heading')).toHaveTextContent(/регистрация/i);
    expect(screen.getByLabelText(/Почта/i)).toHaveAttribute(
      'placeholder',
      expect.stringMatching(/your@email.com/i)
    );
    expect(screen.getByLabelText(/Пароль/i)).toHaveAttribute(
      'placeholder',
      '••••••'
    );
    expect(screen.getByRole('button')).toHaveTextContent(/Регистрация/i);
    expect(screen.getByText(/Уже есть аккаунт\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(/войти/i);
  });

  it('triggers "sign up" in EN locale', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    const { user } = renderWithProviders(
      <SignForm
        formType={'signUp'}
        required={false}
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

    const signup = screen.getByRole('button', { name: /sign up/i });
    expect(signup).toBeInTheDocument();
    await user.click(signup);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it('triggers "sign up" in RU locale', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    const { user } = renderWithProviders(
      <SignForm
        formType={'signUp'}
        required={false}
        handleSubmit={handleSubmit}
      />,
      { locale: 'ru' }
    );
    const emailVal = 'user@fake.com';
    const email = screen.getByLabelText(/почта/i);
    expect(email).toHaveValue('');
    await user.type(email, emailVal);
    expect(email).toHaveValue(emailVal);

    const pwdVal = '1234@Abc';
    const pwd = screen.getByLabelText(/пароль/i);
    expect(pwd).toHaveValue('');
    await user.type(pwd, pwdVal);
    expect(pwd).toHaveValue(pwdVal);

    const signup = screen.getByRole('button', { name: /регистрация/i });
    expect(signup).toBeInTheDocument();
    await user.click(signup);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
