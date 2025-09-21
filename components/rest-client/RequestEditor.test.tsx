import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import RequestEditor from './RequestEditor';
import { renderWithProviders } from '@/__tests__/setupTests';
import { beforeEach } from 'node:test';
import {
  ReadonlyURLSearchParams,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const url = 'https://jsonplaceholder.typicode.com/posts';
const mockRouter: AppRouterInstance = {
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  push: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    __esModule: true,
    ...actual,
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
    useRouter: vi.fn(),
  };
});

describe('RequestEditor', () => {
  beforeEach(() => {});
  it('renders correctly in EN locale', () => {
    const handleSend = vi.fn();
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    renderWithProviders(<RequestEditor onSend={handleSend} />);

    expect(screen.getByRole('combobox')).toHaveTextContent(/get/i);
    expect(screen.getByPlaceholderText(/enter URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
  it('renders correctly in RU locale', () => {
    const handleSend = vi.fn();
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    renderWithProviders(<RequestEditor onSend={handleSend} />, {
      locale: 'ru',
    });

    expect(screen.getByRole('combobox')).toHaveTextContent(/get/i);
    expect(screen.getByPlaceholderText(/введите URL/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /выполнить/i })
    ).toBeInTheDocument();
  });
  it('restores settings from URL', async () => {
    const handleSend = vi.fn();
    const headers = 'Content-Type=application/json';
    vi.mocked(useParams).mockReturnValue({
      slug: [
        'POST',
        'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz',
        'eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=',
      ],
    });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams(headers) as ReadonlyURLSearchParams
    );

    const { user } = renderWithProviders(<RequestEditor onSend={handleSend} />);

    const headersTab = screen.getByRole('tab', { name: /headers/i });
    await user.click(headersTab);
    expect(headersTab).toHaveTextContent(/headers/i);

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveTextContent(/post/i);
      expect(screen.getByPlaceholderText(/enter URL/i)).toHaveValue(url);
      const keys = screen.getAllByPlaceholderText(/header/i);
      const vals = screen.getAllByPlaceholderText(/value/i);
      expect(keys[0]).toHaveValue(headers.split('=')[0]);
      expect(vals[0]).toHaveValue(headers.split('=')[1]);
    });
  });
  it('triggers settings updates', async () => {
    const handleSend = vi.fn();
    const routerSpy = vi.fn();
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );
    mockRouter.replace = routerSpy;
    vi.mocked(useRouter).mockImplementationOnce(() => mockRouter);

    const { user } = renderWithProviders(<RequestEditor onSend={handleSend} />);
    let option: HTMLElement | null = null;
    const methodSelect = screen.getByRole('combobox');
    await user.click(methodSelect);
    await waitFor(async () => {
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(7);
      option = options[2];
      expect(option).toHaveTextContent(/put/i);
    });
    if (option) {
      await user.click(option);
      await waitFor(async () => {
        expect(screen.getByRole('combobox')).toHaveTextContent(/put/i);
        expect(routerSpy).toHaveBeenCalled();
      });
    }
    const urlInput = screen.getByPlaceholderText(/enter URL/i);
    await user.type(urlInput, url);
    await waitFor(async () => {
      await user.tab();
      expect(urlInput).toHaveValue(url);
    });
  });
});
