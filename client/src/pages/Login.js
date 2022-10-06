import {
  Box,
  Button,
  Container,
  Link,
  TextField
} from '@mui/material';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import NavBar from "../components/NavBar"
import UserContext from '../UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(UserContext);
  //navigation
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password })
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin='dense'
          />
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin='dense'
          />
          <Button
            onClick={loginUser}
            sx={{
              mt: 1,
            }}
          >Login</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login