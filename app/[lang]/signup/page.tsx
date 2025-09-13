'use client';

import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import z from 'zod';
import { useFormSchema, type FormData } from './types';
import { redirect, useRouter } from 'next/navigation';
import SignForm from '@/components/signForm/SignForm';
import LayoutLoader from '@/components/common/LayoutLoader';
import { MessageContext } from '@/components/common/MessageContextProvider';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';
import { useTranslations } from 'next-intl';

const initialFormState = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [user, loadingUser] = useAuthState(auth);
  const [userFormData, setFormData] = useState<FormData>(initialFormState);
  const [showErrors, setShowErrors] = useState(false);
  const formSchema = useFormSchema();
  const { addSnackMessage } = useContext(MessageContext);
  const [createUser, createUserResult, createUserLoading, createUserError] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const t = useTranslations('Sign');

  if (user) redirect('/');

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors || !userFormData.email || !userFormData.password) {
      setShowErrors(true);
      return;
    }
    const res = await createUser(userFormData.email, userFormData.password);
    if (res) {
      addSnackMessage({ text: t('signUpSuccess'), messageType: 'success' });
    }
  };

  const lastErrorRef = useRef<FirebaseError | null>(null);
  const createdUserRef = useRef<UserCredential | null>(null);

  useEffect(() => {
    if (createUserResult && createUserResult !== createdUserRef.current) {
      createdUserRef.current = createUserResult;
      reset();
      router.replace('/');
    }

    if (createUserError && createUserError !== lastErrorRef.current) {
      lastErrorRef.current = createUserError;
      addSnackMessage({
        text: t('signInError') + createUserError.code,
        messageType: 'error',
      });
    }
  }, [createUserError, addSnackMessage, createUserResult, router, t]);

  const errors = showErrors ? validate() : undefined;

  const content =
    loadingUser || createUserLoading ? (
      LayoutLoader()
    ) : (
      <SignForm
        formType={'signUp'}
        userFormData={userFormData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    );

  return content;
}
