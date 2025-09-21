import { describe, expect, it, Mock, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './setupTests';
import { useAuthState } from 'react-firebase-hooks/auth';
import RestClient from '@/app/[lang]/(clientPages)/client/[[...slug]]/page';
import {
  ReadonlyURLSearchParams,
  useParams,
  useSearchParams,
} from 'next/navigation';
import { sendRequest } from '@/app/actions';
import { RestResponse } from '@/types/restClient';

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

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  redirect: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/app/actions', () => ({
  sendRequest: vi.fn(),
}));

const uuid = crypto.randomUUID();
const userStub = {
  uid: uuid,
};
const clientTabs = ['http headers', 'body'] as const;

describe('RestClient page', () => {
  it('renders component loader', () => {
    (useAuthState as Mock).mockReturnValue([userStub]);
    renderWithProviders(<RestClient />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders RequestEditor', async () => {
    (useAuthState as Mock).mockReturnValue([userStub]);
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    renderWithProviders(<RestClient />);
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveTextContent(/get/i);
      expect(screen.getByPlaceholderText(/enter URL/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(2);
      for (const label of clientTabs) {
        expect(screen.getByText(new RegExp(label, 'i'))).toBeInTheDocument();
      }
    });
  });
  it('handles successful request', async () => {
    const respStub: RestResponse = {
      body: '{"text": "Hello World"}',
      status: 200,
      statusText: 'OK',
    };

    vi.mocked(sendRequest).mockResolvedValue(respStub);
    (useAuthState as Mock).mockReturnValue([userStub]);
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    const { user } = renderWithProviders(<RestClient />);
    const send = screen.getByRole('button', { name: /send/i });
    await user.click(send);

    const alert = await screen.findByRole('alert', {}, { timeout: 3000 });
    expect(alert).toHaveTextContent(/Request completed successfully/i);
    await waitFor(() => {
      expect(screen.getByText(/response/i)).toBeInTheDocument();
      expect(screen.getByText(/status: 200/i)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(/"text": "Hello World"/i)
      ).toBeInTheDocument();
    });
  });
  it('handles failed request', async () => {
    const errorStub = {
      error: {
        name: 'Type error',
        message: 'Failed to fetch',
      },
    };

    vi.mocked(sendRequest).mockResolvedValue(errorStub);
    (useAuthState as Mock).mockReturnValue([userStub]);
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    const { user } = renderWithProviders(<RestClient />);
    const send = screen.getByRole('button', { name: /send/i });
    await user.click(send);

    const alert = await screen.findByRole('alert', {}, { timeout: 3000 });
    expect(alert).toHaveTextContent(/Error sending request:/i);
    await waitFor(() => {
      expect(screen.queryByText(/response/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/status: 200/i)).not.toBeInTheDocument();
    });
  });
});
