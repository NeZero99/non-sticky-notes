import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
}

//navigation
function NavBar( {position} ) {
  return (
    <AppBar position={position} color='transparent'>
      <Toolbar>
          <Typography variant="h6" color='secondary' component={Link} to={'/'} sx={{ flexGrow: 1, textDecoration: 'none'}}>
          Non-Sticky Notes
          </Typography>
          <Button component={Link} to={'/notes'} color='secondary'>All notes</Button>
          <Button color="secondary">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar