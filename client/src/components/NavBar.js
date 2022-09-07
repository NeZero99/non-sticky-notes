import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
}

function NavBar() {
  return (
    <AppBar position="static" color='secondary'>
      <Toolbar>
          <Typography variant="h6" color='inherit' component={Link} to={'/'} sx={{ flexGrow: 1, textDecoration: 'none'}}>
          ToDoingList
          </Typography>
          <Button component={Link} to={'/notes'} color='inherit'>All notes</Button>
          <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar