import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { Link as LinkRouter, useNavigate,  } from 'react-router-dom';
import { useContext, useState } from 'react';
import NavBar from "../components/NavBar"
import UserContext from '../utils/UserContext';
import { useForm } from 'react-hook-form';
import SnackbarFlash from '../components/SnackbarFlash';

function Login() {
  const { setCurrentUser } = useContext(UserContext);
  //snackbar for auth failed
  const [openSnack, setOpenSnack] = useState(false);
  //navigation
  const navigate = useNavigate();
  //validation
  const { register, handleSubmit, formState: {errors} } = useForm();

  const loginUser = async (data) => {
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (res.status === 401) throw new Error('auth is failed');
      const {user} = await res.json();
      setCurrentUser(user);
      navigate('/notes', {state: {message: `Welcome back ${user.username}`, severity: 'success'}});
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
          onSubmit={handleSubmit(loginUser)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 300,
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2
          }}>
          <Link component={LinkRouter} to={'/register'}
            underline='hover'
            color='secondary'
          >No account? Register here!</Link>
          <TextField
            label='Username'
            margin='dense'
            {...register('username', {required: 'Username is required!'})}
            error={!!errors?.username || openSnack}
            helperText={errors?.username && errors.username.message}
          />
          <TextField
            label='Password'
            type='password'
            autoComplete='off'
            margin='dense'
            {...register('password', {required: 'Password is required!'})}
            error={!!errors?.password || openSnack}
            helperText={errors.password && errors.password.message}
          />
          <Button
            type='submit'
            sx={{
              mt: 1,
            }}
          >Login</Button>
        </Box>
      </Box>
      <SnackbarFlash />
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        ><Alert severity='error'>Incorrect username or password</Alert>
      </Snackbar>
    </Container>
  )
}

export default Login