import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginRequest } from '@slices';
import { TLoginData } from '@api';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: TLoginData = {
      email,
      password
    };
    dispatch(loginRequest(data)).then(() => navigate(fromPath));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
