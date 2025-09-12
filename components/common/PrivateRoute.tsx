'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import LayoutLoader from './LayoutLoader';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return LayoutLoader();

  if (!user) {
    redirect('/signin');
  }

  return children;
}
