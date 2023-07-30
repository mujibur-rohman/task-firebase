import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-diSOrcnmOpVM9LhKyF42_tpaxoc0SPM',
  authDomain: 'task-management-2779c.firebaseapp.com',
  projectId: 'task-management-2779c',
  storageBucket: 'task-management-2779c.appspot.com',
  messagingSenderId: '385114780169',
  appId: '1:385114780169:web:2aa105126733a139037ed8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
