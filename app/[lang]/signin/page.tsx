'use client';

import { FormEvent } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { redirect, useRouter } from 'next/navigation';
import SignForm from '@/components/signForm/SignForm';
import LayoutLoader from '@/components/common/LayoutLoader';

export default function SignIn() {
  const [user, loader] = useAuthState(auth);
  const [signInUser, result, loading, signInUserError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  if (loader || loading) return LayoutLoader();
  if (user) redirect('/');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (
      !email ||
      typeof email !== 'string' ||
      !password ||
      typeof password !== 'string'
    ) {
      return;
    }

    signInUser(email, password);
  };

  if (!loading && result) {
    console.log('Signed in:', result.user);
    router.push('/');
  }

  if (!loading && signInUserError) {
    console.log('Signed in:', signInUserError.message);
  }

  return (
    <SignForm formType={'signIn'} required={true} handleSubmit={handleSubmit} />
  );
}
