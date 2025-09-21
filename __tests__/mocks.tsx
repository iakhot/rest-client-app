import { RequestHistory } from '@/types/history';
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';
import { vi } from 'vitest';

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>;
  children: React.ReactNode;
};

export const RouterContextMock = ({
  router,
  children,
}: AppRouterContextProviderMockProps): React.ReactNode => {
  const mockedRouter: AppRouterInstance = {
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
    ...router,
  };
  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  );
};

export const mockHistory: RequestHistory = {
  uuid: '1',
  userId: '123',
  endpoint: '/api/test',
  requestMethod: 'GET',
  requestHeaders: '{}',
  requestBody: '',
  requestSize: '100',
  requestTimestamp: 1758465276478,
  responseSize: '100',
  responseStatus: 200,
  errorDetails: 'Ok',
  requestDuration: '100',
};
