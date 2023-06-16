import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGoogleLogin from '../../components/ButtonGoogleLogin';
import { useLocalStorage } from '../../../hooks/localStorage';

export const LoginPage = () => {
  const [credential] = useLocalStorage('credential');
  const navigate = useNavigate();
  useEffect(() => {
    credential && navigate('/home');
  }, [credential]);
  return (
    <>
      <h1>Login Page</h1>
      <ButtonGoogleLogin />
    </>
  );
};
