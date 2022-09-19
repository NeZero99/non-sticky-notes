import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';

//navigation
function NavBar( {position} ) {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  
  const logout = async () => {
    try{
      const res = await fetch('/user/logout', {
        method: 'POST',
      });
      if(!res.ok) throw new Error(res.statusText);
      const data = res.json();
      console.log(data);
      setCurrentUser(null);
    }
    catch(e){
      console.log(e.message);
    }
  }

  return (
    <AppBar position={position} color='transparent'>
      <Toolbar>
          <Typography variant="h6" color='secondary' component={Link} to={'/'} sx={{ flexGrow: 1, textDecoration: 'none'}}>
          Non-Sticky Notes
          </Typography>
          <Button component={Link} to={'/notes'} color='secondary'>All notes</Button>
          {currentUser ? (
            <Button onClick={logout} color="secondary">Logout</Button>
          ) : (
            <>
            <Button component={Link} to={'/login'} color="secondary">Login</Button>
            <Button component={Link} to={'/register'} color="secondary">Register</Button>
            </>
          )}
          
      </Toolbar>
    </AppBar>
  )
}

export default NavBar