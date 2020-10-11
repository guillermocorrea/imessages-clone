import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Imessage from './components/Imessage';
import Login from './components/Login';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName ?? '',
            email: authUser.email ?? '',
            photo: authUser.photoURL ?? '',
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);
  return <div className='app'>{user ? <Imessage /> : <Login />}</div>;
}

export default App;
