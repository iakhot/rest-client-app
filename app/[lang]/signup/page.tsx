'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import z from 'zod';
import { useFormSchema, type FormData } from './types';
import { useRouter } from 'next/navigation';
import SignForm from '@/components/sign-form/sign-form';

const initialFormState = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [userFormData, setFormData] = useState<FormData>(initialFormState);
  const [showErrors, setShowErrors] = useState(false);
  const formSchema = useFormSchema();

  const [createUser, result, loading, createUserError] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const formData = {
    ...initialFormState,
    ...userFormData,
  };

  const validate = () => {
    const res = formSchema.safeParse(formData);
    if (res.success) {
      setShowErrors(false);
      return undefined;
    }
    return z.flattenError(res.error).fieldErrors;
  };

  const reset = () => setFormData(initialFormState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors || !userFormData.email || !userFormData.password) {
      setShowErrors(true);
      return;
    }
    createUser(userFormData.email, userFormData.password);
  };

  useEffect(() => {
    if (!loading && result) {
      console.log('Signed up:', result.user);
      reset();
      router.push('/');
    }
  }, [loading, result, router]);

  useEffect(() => {
    if (!loading && createUserError) {
      console.log('Signed up:', createUserError.message);
    }
  }, [createUserError, loading]);

  const errors = showErrors ? validate() : undefined;

  return (
    <SignForm
      formType={'signUp'}
      userFormData={userFormData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
