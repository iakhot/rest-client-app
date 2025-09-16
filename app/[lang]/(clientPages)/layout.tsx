import PrivateRoute from '@/components/common/PrivateRoute';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import NavMenuAuth from '@/components/main-page/NavMenuAuth';

export default async function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  return (
    <PrivateRoute>
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            mt: 4,
            px: { xs: 2, sm: 0 },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            component="nav"
            sx={{
              width: { xs: '100%', sm: 200 },
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'column' },
              gap: 2,
              pr: { xs: 0, sm: 2 },
              pb: { xs: 1, sm: 0 },
              overflowX: { xs: 'auto', sm: 'visible' },
            }}
          >
            <NavMenuAuth />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              pl: { xs: 0, sm: 2 },
              pt: { xs: 2, sm: 0 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </PrivateRoute>
  );
}
