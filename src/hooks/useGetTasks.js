import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useGetTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'tasks'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTasks(list);
      },
      (error) => setError(error)
    );

    return () => {
      unsub();
    };
  }, []);
  return { tasks, error };
};

export default useGetTasks;
