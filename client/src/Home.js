import NoteForm from './components/NoteForm'
import NavBar from './components/NavBar'
import QuoteCard from './components/QuoteCard';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Typography, Container, ListItemText, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function Home() {
  const [quote, setQuote] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    getQuote();
  }, [])

  const getQuote = async () => {
    let res = await fetch("/quote");
    if(res.ok) {
      const data = await res.json();
      setQuote({content: data.body, author: data.author});
      console.log(data);
    }
  }

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
      <NavBar />
      {/* <Grid container columns={16} spacing={2} sx={{alignItems: 'center'}}>
        <Grid md={5} order={{xs: 1, md: 0}}>
          <QuoteCard quote={quote1} />
        </Grid>
        <Grid md={6} order={{xs: 0, md: 1}}>
          <NoteForm saveNote={saveNote} />
        </Grid>
      </Grid> */}
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Box sx={{
          
        }}>
          <Typography variant='h2' sx={{color: 'white'}}>{quote.content}</Typography>
          <Typography variant='h4' align='right' sx={{color: 'white'}} gutterBottom>-{quote.author}</Typography>
          <NoteForm saveNote={saveNote} />
        </Box>
      </Box>
    </Container>
  )
}

export default Home