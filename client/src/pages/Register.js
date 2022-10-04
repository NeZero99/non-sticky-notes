import NavBar from "../components/NavBar"
import {
    Box,
    TextField,
    Button,
    Container
} from '@mui/material';
import UserContext from '../UserContext';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  //states for values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

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
      const {user} = await res.json();
      setCurrentUser(user);
      navigate('/notes');
    }
    catch(e) {
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
          <TextField 
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin='dense'
            />
          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin='dense'
            />
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin='dense'
            />
          <Button onClick={registerUser}
            sx={{
              mt: 1,
            }}
          >Register</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Register