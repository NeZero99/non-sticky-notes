import React, {useState, useEffect} from 'react'
import NoteForm from './components/NoteForm';
import NavBar from './components/NavBar';
import './App.css';
import NoteContainer from './components/NoteContainer';
import io from 'socket.io-client';
import { Container, Box } from '@mui/material';

const socket = io.connect('http://localhost:5000')

function Notes() {
  const [notes, setNotes] = useState([]);
  const [cursor, setCursor] = useState('default');

  useEffect(() => {
    getData()

    socket.on('check_done', (res) => {
      
    })
  }, [])

  const getData = async () => {
    const response = await fetch('/notes')
    if(!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json()
    // console.log(data)
    setNotes(data)
    // console.log('use effect hook')
  }

  const saveNote = async (newNote) => {
    setCursor('wait');
    setNotes([...notes, {_id: 'loadingNote'}]);
    const res = await fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newNote)
    });

    const data = await res.json();
    setNotes([...notes, data]);//setState je asinhrona operacija, zato ovaj drugi setState odradi preko onog prvog
    setCursor('default');
  }

  const saveEditedNote = async (newNote, noteId) => {
    const res = await fetch(`/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newNote)
    });
    const savedNote = await res.json();
    setNotes(notes.map(note => {
      if(note._id === savedNote._id) return savedNote;
      return note
    }))
  }

  const deleteNote = async (id) => {
    setCursor('wait');
    const res = await fetch(`/notes/${id}`, {
      method: 'DELETE'
    });
    const _id = await res.json()
    setNotes(notes.filter(note => note._id !== _id))
    setCursor('default');
  }

  const toggleCheck = async (noteId, itemId, value) => {
    setNotes(notes.map(e => {
      if(e._id === noteId) {
        e.toDoList.map(item => {
          if(item._id === itemId) item.checked = value
          return item
        })
      }
      return e
    }))
    await socket.emit('check_update', {noteId, itemId, value});
  }

  const cursorWait = {
    cursor: cursor
  }

  return (
    <>
      <NavBar position={'static'} />
      <Container className='container' style={cursorWait}>
        <Box sx={{mt: 6}}>
          <NoteForm saveNote={saveNote} />
          <NoteContainer 
            allNotes={notes}
            onDelete={deleteNote}
            onCheck={toggleCheck}
            saveEditedNote={saveEditedNote}/>
        </Box>
      </Container>
    </>
  )
}

export default Notes