import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';

//navigation
function NavBar( {position} ) {
  //for user menu
  const [anchorEl, setAnchorEl] = useState(null);
  //for loged user
  const {currentUser, setCurrentUser} = useContext(UserContext);
  //for navigation
  const navigate = useNavigate();
  
  const logout = async () => {
    try{
      let username = currentUser.username;
      const res = await fetch('/api/user/logout', {
        method: 'POST',
      });
      if(!res.ok) throw new Error(res.statusText);
      const {user} = await res.json();
      setCurrentUser(user);
      navigate('/', {state: {message: `Good bye ${username}`}});
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
        {currentUser && (
          <Button component={Link} to={'/notes'} color='secondary'>All notes</Button>
        )}
        <div>
          <IconButton
            size="large"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="secondary"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            sx={{mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {currentUser ? (
              <div>
                <MenuItem>User: {currentUser.username}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem component={Link} to={'/login'}>Login</MenuItem>
                <MenuItem component={Link} to={'/register'}>Register</MenuItem>
              </div>
            )}
          </Menu>
        </div>
          
      </Toolbar>
    </AppBar>
  )
}

export default NavBar