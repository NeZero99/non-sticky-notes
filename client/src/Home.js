import NoteForm from './components/NoteForm'
import NavBar from './components/NavBar'
import QuoteCard from './components/QuoteCard';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Typography, Container, ListItemText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function Home() {
  const [quote1, setQuote1] = useState({});
  const [quote2, setQuote2] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    getQuote();
  }, [])

  const getQuote = async () => {
    let res = await fetch("https://api.quotable.io/random");
    if(res.ok) {
      const data = await res.json();
      setQuote1({content: data.content, author: data.author});
    }
    res = await fetch("https://api.quotable.io/random");
    if(res.ok) {
      const data = await res.json();
      setQuote2({content: data.content, author: data.author});
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
    <Container sx={{height: '100vh'}}>
      <NavBar />
      <Grid container columns={16} spacing={2} sx={{alignItems: 'center'}}>
        <Grid md={5} order={{xs: 1, md: 0}}>
          <QuoteCard quote={quote1} />
        </Grid>
        <Grid md={6} order={{xs: 0, md: 1}}>
          <NoteForm saveNote={saveNote} />
        </Grid>
        <Grid md={5} order={{xs: 2}}>
          <QuoteCard quote={quote2} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home