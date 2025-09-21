'use client';
import { Box } from '@mui/material';
import CentralArea from '@/components/main-page/CentralArea';
import { redirect } from 'next/navigation';
import LayoutLoader from '@/components/common/LayoutLoader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);

  if (user) redirect('/main');

  return (
    <>
      {loadingUser ? (
        LayoutLoader()
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CentralArea />
        </Box>
      )}
    </>
  );
}
