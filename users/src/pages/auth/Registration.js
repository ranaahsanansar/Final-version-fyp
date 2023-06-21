import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';

const Registration = () => {
  const [error, setError] = useState({
    name: { status: false, msg: '', type: '' },
    email: { status: false, msg: '', type: '' },
    password: { status: false, msg: '', type: '' },
    password_confirmation: { status: false, msg: '', type: '' },
    tc: { status: false, msg: '', type: '' }
  });

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      tc: data.get('tc'),
    };

    setError({
      name: { status: false, msg: '', type: '' },
      email: { status: false, msg: '', type: '' },
      password: { status: false, msg: '', type: '' },
      password_confirmation: { status: false, msg: '', type: '' },
      tc: { status: false, msg: '', type: '' }
    });

    if (actualData.name.trim() === '') {
      setError((prevState) => ({
        ...prevState,
        name: { status: true, msg: 'Name is required', type: 'error' }
      }));
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(actualData.name)) {
      setError((prevState) => ({
        ...prevState,
        name: {
          status: true,
          msg: 'Invalid name format. Only letters and spaces are allowed.',
          type: 'error'
        }
      }));
      return;
    }

    if (actualData.email.trim() === '') {
      setError((prevState) => ({
        ...prevState,
        email: { status: true, msg: 'Email is required', type: 'error' }
      }));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(actualData.email)) {
      setError((prevState) => ({
        ...prevState,
        email: { status: true, msg: 'Invalid email format', type: 'error' }
      }));
      return;
    }

    if (actualData.password.trim() === '') {
      setError((prevState) => ({
        ...prevState,
        password: { status: true, msg: 'Password is required', type: 'error' }
      }));
      return;
    }

    if (actualData.password.length < 8) {
      setError((prevState) => ({
        ...prevState,
        password: {
          status: true,
          msg: 'Password must be at least 8 characters long',
          type: 'error'
        }
      }));
      return;
    }

    if (actualData.password !== actualData.password_confirmation) {
      setError((prevState) => ({
        ...prevState,
        password_confirmation: {
          status: true,
          msg: "Password and Confirm Password don't match",
          type: 'error'
        }
      }));
      return;
    }

    if (!actualData.tc) {
      setError((prevState) => ({
        ...prevState,
        tc: { status: true, msg: 'Please agree to the terms and conditions', type: 'error' }
      }));
      return;
    }

    try {
      const res = await registerUser(actualData);
      console.log(res);
      if (res.data.status === 'success') {
        storeToken(res.data.token);
        navigate('/dashboard');
      }
      if (res.data.status === 'failed') {
        setError((prevState) => ({
          ...prevState,
          email: { status: true, msg: res.data.message, type: 'error' }
        }));
      }
    } catch (error) {
      setError((prevState) => ({
        ...prevState,
        email: { status: true, msg: 'An error occurred during registration', type: 'error' }
      }));
    }
  };

  return (
    <>
      <Box component='form' validate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
        <TextField
          margin='normal'
          type='text'
          required
          fullWidth
          id='name'
          name='name'
          label='Name'
          error={error.name.status}
          helperText={error.name.msg}
          inputProps={{ maxLength: 50 }}
        />
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
          inputProps={{ minLength: 8 }}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password_confirmation'
          name='password_confirmation'
          label='Confirm Password'
          type='password'
          error={error.password_confirmation.status}
          helperText={error.password_confirmation.msg}
          inputProps={{ minLength: 8 }}
        />
        <FormControlLabel
          control={<Checkbox value={true} color='primary' name='tc' id='tc' />}
          label='I agree to terms and conditions.'
          error={error.tc.status}
          helperText={error.tc.msg}
        />
        <Box textAlign='center'>
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, px: 5, backgroundColor: '#F3E5AB', color: 'black' }}
          >
            Join
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Registration;
