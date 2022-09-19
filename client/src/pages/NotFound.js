import NavBar from "../components/NavBar"
import { Box, Typography } from '@mui/material'

function NotFound() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      <NavBar position={'static'}/>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant='h1' color='secondary'>404</Typography>
        <Typography color='secondary'>Page not found.</Typography>
      </Box>
    </Box>
    
  )
}

export default NotFound