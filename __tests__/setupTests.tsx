import '@testing-library/jest-dom/vitest';
import { ReactElement, ReactNode } from 'react';
import { cleanup, render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import * as EnMessages from '@/messages/en.json';
import * as RuMessages from '@/messages/ru.json';
import { afterEach } from 'vitest';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  locale?: string;
}

function createWrapper({ locale }: { locale?: string }) {
  const ParametrizedWrapper = ({ children }: { children: ReactNode }) => (
    <NextIntlClientProvider
      locale={locale}
      messages={locale === 'en' ? EnMessages : RuMessages}
    >
      {children}
    </NextIntlClientProvider>
  );
  return ParametrizedWrapper;
}

export const renderWithProviders = (
  jsx: ReactElement,
  { locale = 'en', ...renderOptions }: ExtendedRenderOptions = {}
) => {
  const providerWrapper = createWrapper({ locale: locale });
  return {
    user: userEvent.setup(),
    ...render(jsx, {
      wrapper: providerWrapper,
      ...renderOptions,
    }),
  };
};

afterEach(() => {
  cleanup();
});
