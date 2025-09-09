'use client';

import { FormEvent, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import SignForm from '@/components/sign-form/sign-form';

export default function SignIn() {
  const [signInUser, result, loading, signInUserError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

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

  useEffect(() => {
    if (!loading && result) {
      console.log('Signed in:', result.user);
      router.push('/');
    }
  }, [loading, result, router]);

  useEffect(() => {
    if (!loading && signInUserError) {
      console.log('Signed in:', signInUserError.message);
    }
  }, [loading, signInUserError]);

  return (
    <SignForm formType={'signIn'} required={true} handleSubmit={handleSubmit} />
  );
}
