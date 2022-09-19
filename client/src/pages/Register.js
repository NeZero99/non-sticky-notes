import NavBar from "../components/NavBar"
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    try{
      const res = await fetch('/user/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({username, email, password})
      });
      if(!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      console.log(data);
    }
    catch(e) {
      console.log(e.message);
    }
  }

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <NavBar position={'static'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 300,
          backgroundColor: 'white'
        }}>
        <TextField 
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <Button onClick={registerUser}>Register</Button>
      </Box>
    </Box>
  )
}

export default Register