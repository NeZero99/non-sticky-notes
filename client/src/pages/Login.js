import NavBar from "../components/NavBar"
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setCurrentUser} = useContext(UserContext);
  //navigation
  const navigate = useNavigate();

  const loginUser = async () => {
    try{
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({username, password})
      });
      if(res.status === 401) throw new Error('auth is failed');
      const {user} = await res.json();
      setCurrentUser(user);
      navigate('/notes');
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