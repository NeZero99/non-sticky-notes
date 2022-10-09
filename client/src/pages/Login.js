import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { Link as LinkRouter, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import NavBar from "../components/NavBar"
import UserContext from '../utils/UserContext';
import { useForm } from 'react-hook-form';

function Login() {
  const { setCurrentUser } = useContext(UserContext);
  //navigation
  const navigate = useNavigate();
  const location = useLocation();
  //validation
  const { register, handleSubmit, formState: {errors} } = useForm();
  //snackbar
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    if(location.state?.toSave) setOpenSnack(true);
  }, [location])

  const loginUser = async (data) => {
    try {
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (res.status === 401) throw new Error('auth is failed');
      const { user } = await res.json();
      setCurrentUser(user);
      navigate('/notes');
    }
    catch (e) {
      console.log(e.message);
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
            error={!!errors?.username}
            helperText={errors?.username && errors.username.message}
          />
          <TextField
            label='Password'
            margin='dense'
            {...register('password', {required: 'Password is required!'})}
            error={!!errors?.password}
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
      <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={() => setOpenSnack(false)}
        ><Alert severity="info">Please login to save Notes</Alert></Snackbar>
    </Container>
  )
}

export default Login