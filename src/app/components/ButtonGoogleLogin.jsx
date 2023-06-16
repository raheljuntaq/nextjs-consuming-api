'use client';
import { GoogleLogin } from '@react-oauth/google';
import useLocalStorage from '../hooks/localStorage';

const ButtonGoogleLogin = () => {
  const [setCredentialStorage] = useLocalStorage('credential');
  const onCredentialSuccess = (response) => {
    setCredentialStorage(response.credential);
  };
  const onCredentialError = (error) => {
    console.log(error);
  };
  return (
    <div>
      <GoogleLogin onSuccess={onCredentialSuccess} onError={onCredentialError}></GoogleLogin>
    </div>
  );
};

export default ButtonGoogleLogin;
