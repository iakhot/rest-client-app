'use client';

import { auth, database } from '@/firebase/config';
import { useSignOut } from 'react-firebase-hooks/auth';
import { ref, child, get } from 'firebase/database';

function History() {
  const [signOut] = useSignOut(auth);

  const dbRef = ref(database);
  get(child(dbRef, `history`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });

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
