import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { userLogin } from '../features/userSlice';
import { auth, db } from '../firebase/config';

const useLogin = () => {
  const dispatch = useDispatch();
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userInfo = {
          displayName: user.displayName,
          userId: user.uid,
          photoURL: user.photoURL,
          email: user.email,
        };
        const userRef = doc(db, 'users', user.uid);

        await updateDoc(userRef, {
          online: true,
        });

        toast.success('Login Success, Redirecting', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });

        setTimeout(() => {
          dispatch(userLogin(userInfo));
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        alert('Username or Password Incorrect');
      });
  };

  return login;
};

export default useLogin;
