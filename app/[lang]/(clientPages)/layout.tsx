import PrivateRoute from '@/components/common/PrivateRoute';
import { ReactNode } from 'react';
import { Stack } from '@mui/material';
import NavMenuAuth from '@/components/main-page/NavMenuAuth';

export default async function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  return (
    <PrivateRoute>
      <Stack
        marginTop={4}
        direction={{ xs: 'column', sm: 'row' }}
        paddingX={{ xs: 1, sm: 0 }}
        height="100%"
        overflow="auto"
      >
        <NavMenuAuth />
        {children}
      </Stack>
    </PrivateRoute>
  );
}
