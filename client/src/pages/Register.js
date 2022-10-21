import NavBar from "../components/NavBar"
import {
  Box,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import UserContext from '../utils/UserContext';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Register() {
  //states for values
  const { setCurrentUser } = useContext(UserContext);
  //snackbar for auth failed
  const [openSnack, setOpenSnack] = useState(false);
  //navigation
  const navigate = useNavigate();
  //validation
  const { register, handleSubmit, formState: {errors}, watch} = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const registerUser = async ({ username, email, password }) => {
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });
      if (!res.ok) throw new Error(res.statusText);
      const { user } = await res.json();
      setCurrentUser(user);
      navigate('/notes', {state: {message: `Welcome ${user.username}`, severity: 'success'}});
    }
    catch (e) {
      setOpenSnack(true);
    }
  }

  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <NavBar position={'absolute'} />
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box
          component={'form'}
          onSubmit={handleSubmit(registerUser)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 300,
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2
          }}>
          <TextField
            label='Username'
            margin='dense'
            {...register('username', {required: 'Username is required!'})}
            error={!!errors?.username || openSnack}
            helperText={errors?.username && errors.username.message}
          />
          <TextField
            label='Email'
            type='email'
            margin='dense'
            {...register('email', {required: 'Email is required!'})}
            error={!!errors?.email || openSnack}
            helperText={errors?.email && errors.email.message}
          />
          <TextField
            label='Password'
            type='password'
            autoComplete='off'
            margin='dense'
            {...register('password', {required: 'Password is required!'})}
            error={!!errors?.password}
            helperText={errors?.password && errors.password.message}
          />
          <TextField
            label='Repeat a password'
            type='password'
            autoComplete='off'
            margin='dense'
            {...register('repPassword', {
              required: 'This field is required!',
              validate: value => value === password.current ? true : "Passwords do not match"
            })}
            error={!!errors?.repPassword}
            helperText={errors?.repPassword && errors.repPassword.message}
          />
          <Button
            type={'submit'}
            sx={{
              mt: 1,
            }}
          >Register</Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        ><Alert severity='error'>Username or email already exist</Alert>
      </Snackbar>
    </Container>
  )
}

export default Register