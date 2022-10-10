import { Box, Card, CardContent, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import Typical from 'react-typical';
import NavBar from '../components/NavBar';
import NoteForm from '../components/NoteForm';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../utils/UserContext';

function Home() {
  //navigation on routing
  let navigate = useNavigate();
  const location = useLocation();
  //user
  const { currentUser } = useContext(UserContext);
  //snackbar
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    if(location.state) setOpenSnack(true);
  }, [location])
 
  const saveNote = async (newNote) => {//sending post request to a server to save a note
    if(!currentUser) {
      sessionStorage.setItem('note', JSON.stringify(newNote))
      return navigate('/login', {state: {message: 'Please login to save Notes', severity: 'info'}});
    }
    
    const res = await fetch('/notes', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify(newNote)
    });

    if(res.ok) navigate("/notes");
  }

  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <NavBar position={'absolute'} />
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div><NoteForm saveNote={saveNote} /></div>
      </Box>
      <Card sx={{
        minWidth: 350,
        maxWidth: 400,
        height: 50,
        mx: 'auto',
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0)',
      }}>
        <CardContent>
          <Typography variant='body2' align='center' color='secondary'>
            <Typical //typing animation
              steps={[
                'Built by: Nemanja Radoicic', 2000,
              ]}
              loop={1}
              wrapper="span"
            />
          </Typography>
        </CardContent>
      </Card>
      {location.state && (
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={() => setOpenSnack(false)}
        ><Alert severity={location.state.severity}>{location.state.message}</Alert>
      </Snackbar>
      )}
    </Container>
  )
}

export default Home