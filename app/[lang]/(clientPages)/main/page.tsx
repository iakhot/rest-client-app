'use client';
import { Stack } from '@mui/material';
import CentralAreaAuth from '@/components/main-page/CentralAreaAuth';
import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function HomeAuth() {
  const [user] = useAuthState(auth);

  return (
    <Stack width="100%">
      <CentralAreaAuth email={user?.email} />
    </Stack>
  );
}
