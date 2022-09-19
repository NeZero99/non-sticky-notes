import NavBar from "../components/NavBar"
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setCurrentUser} = useContext(UserContext);

  const loginUser = async () => {
    try{
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({username, password})
      });
      if(!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setCurrentUser(data);
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
      <NavBar position={'static'}/>
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
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <Button onClick={loginUser}>Login</Button>
      </Box>
    </Box>
  )
}

export default Login