import { describe, expect, it, Mock, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SignIn from '@/app/[lang]/signin/page';
import { renderWithProviders } from './setupTests';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';

vi.mock('@/firebase/config', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
  },
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
  useSignInWithEmailAndPassword: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  redirect: vi.fn(),
}));

describe('Signin page', () => {
  it('renders component loader', () => {
    (useAuthState as Mock).mockReturnValue([null, true, undefined]);
    (useSignInWithEmailAndPassword as Mock).mockReturnValue([
      vi.fn().mockResolvedValue({ user: { uid: '123' } }),
      null,
      false,
      null,
    ]);
    renderWithProviders(<SignIn />, { locale: 'en' });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders correctly in EN locale & successful signin', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    (useAuthState as Mock).mockReturnValue([null, false, undefined]);
    (useSignInWithEmailAndPassword as Mock).mockReturnValue([
      vi.fn().mockResolvedValue({ user: { uid: '123' } }),
      null,
      false,
      null,
    ]);
    const { user } = renderWithProviders(<SignIn />, { locale: 'en' });

    expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i);

    const signin = screen.getByRole('button', { name: /sign in/i });
    expect(signin).toBeInTheDocument();
    await user.click(signin);
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    const email = screen.getByLabelText(/email/i);
    const pwd = screen.getByLabelText(/password/i);

    const emailValInvalid = 'user!fake.com';
    const pwdValInvalid = '1234';
    await user.type(email, emailValInvalid);
    await user.type(pwd, pwdValInvalid);
    expect(email).toHaveValue(emailValInvalid);
    expect(pwd).toHaveValue(pwdValInvalid);
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
    const emailValid = 'user@fake.com';
    const pwdValid = '1234@Abc';
    await user.clear(email);
    await user.clear(pwd);

    await user.type(email, emailValid);
    await user.type(pwd, pwdValid);
    expect(email).toHaveValue(emailValid);
    expect(pwd).toHaveValue(pwdValid);
    await user.click(signin);
    const alert = await screen.findByRole('alert', {}, { timeout: 3000 });
    expect(alert).toHaveTextContent(/Successful signin/i);
  });

  it('renders snackBar when signin fails', async () => {
    (useAuthState as Mock).mockReturnValue([null, false, undefined]);
    (useSignInWithEmailAndPassword as Mock).mockReturnValue([
      vi.fn(),
      null,
      false,
      { code: 'signin error' },
    ]);
    const { user } = renderWithProviders(<SignIn />, { locale: 'en' });

    const signin = screen.getByRole('button', { name: /sign in/i });
    const email = screen.getByLabelText(/email/i);
    const pwd = screen.getByLabelText(/password/i);

    const emailValid = 'user@fake.com';
    const pwdValid = '!234Qwer';
    await user.type(email, emailValid);
    await user.type(pwd, pwdValid);
    expect(email).toHaveValue(emailValid);
    expect(pwd).toHaveValue(pwdValid);

    await user.click(signin);

    const alert = await screen.findByRole('alert', {}, { timeout: 3000 });
    expect(alert).toHaveTextContent(/signin error/i);
  });
});
