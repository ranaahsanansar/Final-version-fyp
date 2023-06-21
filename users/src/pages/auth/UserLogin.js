import { TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/authSlice';

const UserLogin = () => {
  const [error, setError] = useState({
    email: { status: false, msg: '', type: '' },
    password: { status: false, msg: '', type: '' },
    general: { status: false, msg: '', type: '' }
  });
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password')
    };

    setError({
      email: { status: false, msg: '', type: '' },
      password: { status: false, msg: '', type: '' },
      general: { status: false, msg: '', type: '' }
    });

    if (!actualData.email || !actualData.password) {
      setError((prevState) => ({
        ...prevState,
        general: { status: true, msg: 'All Fields are Required', type: 'error' }
      }));
      return;
    }

    try {
      const res = await loginUser(actualData);
      if (res.data.status === 'success') {
        storeToken(res.data.token);
        navigate('/dashboard');
      }
      if (res.data.status === 'failed') {
        setError((prevState) => ({
          ...prevState,
          general: { status: true, msg: res.data.message, type: 'error' }
        }));
      }
    } catch (error) {
      setError((prevState) => ({
        ...prevState,
        general: { status: true, msg: 'An error occurred during login', type: 'error' }
      }));
    }
  };

  let token = getToken('token');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserToken({ token: token }));
  }, [token, dispatch]);

  return (
    <>
      <Box component='form' validate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
        <TextField
          margin='normal'
          type='email'
          required
          fullWidth
          id='email'
          name='email'
          label='Email Address'
          error={error.email.status}
          helperText={error.email.msg}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          error={error.password.status}
          helperText={error.password.msg}
        />
        <Box textAlign='center'>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 3, mb: 2, px: 5, backgroundColor: '#F3E5AB', color: 'black' }}
            >
              Login
            </Button>
          )}
        </Box>
        <NavLink to='/sendpasswordresetemail'>Forgot Password?</NavLink>
        {error.general.status && (
          <Alert severity={error.general.type} sx={{ mt: 3 }}>
            {error.general.msg}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default UserLogin;
