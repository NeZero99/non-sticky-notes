import NoteForm from './components/NoteForm'
import NavBar from './components/NavBar'
import QuoteCard from './components/QuoteCard';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Typography, Container, Card, Box, CardContent, Button } from '@mui/material';
import Typical from 'react-typical';

function Home() {
  const [quote, setQuote] = useState({});
  let navigate = useNavigate();

  const saveNote = async (newNote) => {
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
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
        <CardContent>
          <Typography variant='body2' align='center'>
            <Typical
              steps={[
                'Built by: Nemanja Radoicic', 2000,
              ]}
              loop={1}
              wrapper="span"
            />
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Home