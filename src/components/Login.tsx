import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../firebase';
import './Login.css';
import logo from './logo.png';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className='login'>
      <div className='login__logo'>
        <img src={logo} alt='iMessage logo' />
        <h1>iMessage</h1>
      </div>
      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
};

export default Login;
