import NoteForm from './components/NoteForm'
import NavBar from './components/NavBar'
import QuoteCard from './components/QuoteCard';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material';

function Home() {
  const [quote, setQuote] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    getQuote();
  }, [])

  const getQuote = async () => {
    const res = await fetch("https://api.quotable.io/random");
    if(res.ok) {
      const data = await res.json();
      setQuote({content: data.content, author: data.author});
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
    <>
      <NavBar />
      <NoteForm saveNote={saveNote} />
      <QuoteCard quote={quote} />
    </>
  )
}

export default Home