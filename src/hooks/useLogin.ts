import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setAccessToken, setRefreshToken} from '../redux/authSlice';
import {api} from '../utils/api';
const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, token_expires_in: '0.2m'}),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setAccessToken(data.accessToken));
        dispatch(setRefreshToken(data.refreshToken));
      } else {
        setError(data.message || 'An error occurred during login');
      }
    } catch (error: any) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  };
};

export default useLogin;
