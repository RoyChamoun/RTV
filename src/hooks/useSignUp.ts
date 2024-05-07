import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {setAccessToken, setRefreshToken} from '../redux/authSlice';
import {api} from '../utils/api';
import {Alert} from 'react-native';

const useSignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleSignup = async () => {
    setLoading(true);
    setError('');

    if (!email.includes('@')) {
      setError('Invalid email address.');
      setLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${api}signup`, {
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
        setError('');
        setLoading(false);
        console.log(data.accessToken);
        Alert.alert('Success', 'SignUp successful.');
      } else {
        setError(data.message || 'Failed to sign up. Please try again later.');
        setLoading(false);
        Alert.alert(
          'Error',
          data.message || 'Failed to sign up. Please try again later.',
        );
      }
    } catch (error: any) {
      setError('Failed to connect to the server. Please try again later.');
      setLoading(false);
      Alert.alert(
        'Error',
        'Failed to connect to the server. Please try again later.',
      );
    }
  };

  const isFormIncomplete = !email || !password || !confirmPassword;

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSignup,
    isFormIncomplete,
  };
};

export default useSignUp;
