import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useGetTaskById = (idDoc) => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'tasks', idDoc),
      (doc) => {
        setTask(doc.data());
      },
      (error) => setError(error)
    );

    return () => {
      unsub();
    };
  }, [idDoc]);
  return { task, error };
};

export default useGetTaskById;
