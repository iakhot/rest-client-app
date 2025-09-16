import { describe, expect, it, Mock, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './setupTests';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import SignUp from '@/app/[lang]/signup/page';

vi.mock('@/firebase/config', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
  },
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
  useCreateUserWithEmailAndPassword: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  redirect: vi.fn(),
}));

describe('Signup page', () => {
  it('renders component loader', () => {
    (useAuthState as Mock).mockReturnValue([null, true, undefined]);
    (useCreateUserWithEmailAndPassword as Mock).mockReturnValue([
      vi.fn().mockResolvedValue({ user: { uid: '123' } }),
      null,
      false,
      null,
    ]);
    renderWithProviders(<SignUp />, { locale: 'en' });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders correctly in EN locale & successful signup', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    (useAuthState as Mock).mockReturnValue([null, false, undefined]);
    (useCreateUserWithEmailAndPassword as Mock).mockReturnValue([
      vi.fn().mockResolvedValue({ user: { uid: '123' } }),
      null,
      false,
      null,
    ]);
    const { user } = renderWithProviders(<SignUp />, { locale: 'en' });

    expect(screen.getByRole('heading')).toHaveTextContent(/sign up/i);

    const signup = screen.getByRole('button', { name: /sign up/i });
    expect(signup).toBeInTheDocument();
    await user.click(signup);
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
    const email = screen.getByLabelText(/email/i);
    const pwd = screen.getByLabelText(/password/i);

    const emailValInvalid = 'user@fake';
    const pwdValInvalid = '1234';
    await user.type(email, emailValInvalid);
    await user.type(pwd, pwdValInvalid);
    expect(email).toHaveValue(emailValInvalid);
    expect(pwd).toHaveValue(pwdValInvalid);
    expect(screen.getByText(/Enter valid email/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Must be at least 8 characters/i)
    ).toBeInTheDocument();
    expect(signup).toBeDisabled();
  });

  it('renders snackBar when signup fails', async () => {
    (useAuthState as Mock).mockReturnValue([null, false, undefined]);
    (useCreateUserWithEmailAndPassword as Mock).mockReturnValue([
      vi.fn(),
      null,
      false,
      { code: 'signup error' },
    ]);
    const { user } = renderWithProviders(<SignUp />, { locale: 'en' });

    const signup = screen.getByRole('button', { name: /sign up/i });
    const email = screen.getByLabelText(/email/i);
    const pwd = screen.getByLabelText(/password/i);

    const emailValid = 'user@fake.com';
    const pwdValid = '!234Qwer';
    await user.type(email, emailValid);
    await user.type(pwd, pwdValid);
    expect(email).toHaveValue(emailValid);
    expect(pwd).toHaveValue(pwdValid);

    await user.click(signup);

    const alert = await screen.findByRole('alert', {}, { timeout: 3000 });
    expect(alert).toHaveTextContent(/signup error/i);
  });
});
