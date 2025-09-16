'use client';
import { Box } from '@mui/material';
import CentralAreaAuth from '@/components/main-page/CentralAreaAuth';
import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function HomeAuth() {
  const [user] = useAuthState(auth);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '60vh',
      }}
    >
      <CentralAreaAuth email={user?.email} />
    </Box>
  );
}
