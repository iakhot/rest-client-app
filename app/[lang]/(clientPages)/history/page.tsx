'use client';

import { auth } from '@/firebase/config';
import { useSignOut } from 'react-firebase-hooks/auth';

function History() {
  const [signOut] = useSignOut(auth);
  return (
    <>
      <div>This is History page</div>;
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </>
  );
}

export default History;
