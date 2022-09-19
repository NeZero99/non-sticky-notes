import React, {useState, useEffect} from 'react'
import NoteForm from '../components/NoteForm';
import NavBar from '../components/NavBar';
import '../App.css';
import NoteContainer from '../components/NoteContainer';
import io from 'socket.io-client';
import { 
  Container,
  Box,
  Snackbar,
  Alert, 
} from '@mui/material';

const socket = io.connect('http://localhost:5000')

function Notes() {
  //all notes state
  const [notes, setNotes] = useState([]);
  //state for cursor style
  const [cursor, setCursor] = useState('default');
  //error scnackbar states
  const [openSnack, setOpenSnack] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {//fetching all notes from a server
    try{
      const response = await fetch('/notes')
      if(!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setNotes(data);
    }
    catch(e){
      setOpenSnack(true);
      setErrorMessage(e.message);
    }
    
  }

  const saveNote = async (newNote) => {//sending post request to save note
    try{
      setCursor('wait');
      setNotes([...notes, {_id: 'loadingNote'}]);
      const res = await fetch('/notes', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify(newNote)
      });
      if(!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setNotes([...notes, data]);
      setCursor('default');
    }
    catch(e){
      setOpenSnack(true);
      setErrorMessage(e.message);
      setCursor('default');
    }
    
  }

  const saveEditedNote = async (newNote, noteId) => {//sending put request to save edited note
    try{
      const res = await fetch(`/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newNote)
      });
      if(!res.ok) throw new Error(res.statusText);
      const savedNote = await res.json();
      setNotes(notes.map(note => {
        if(note._id === savedNote._id) return savedNote;
        return note
      }))
    }
    catch(e){
      setOpenSnack(true);
      setErrorMessage(e.message);
    }
    
  }

  const deleteNote = async (id) => {//sending request for deleting
    try{
      setCursor('wait');
      const res = await fetch(`/notes/${id}`, {
        method: 'DELETE'
      });
      if(!res.ok) throw Error(res.statusText);
      const _id = await res.json()
      setNotes(notes.filter(note => note._id !== _id));
      setCursor('default');
    }
    catch(e){
      setOpenSnack(true);
      setErrorMessage(e.message);
      setCursor('default');
    }
  }

  const toggleCheck = async (noteId, itemId, value) => {//changing state of the checkbox
    setNotes(notes.map(e => {
      if(e._id === noteId) {
        e.toDoList.map(item => {
          if(item._id === itemId) item.checked = value
          return item
        })
      }
      return e
    }))
    await socket.emit('check_update', {noteId, itemId, value});//sending info to the server via socket
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
        <Snackbar
          open={openSnack}
          autoHideDuration={2000}
          onClose={() => setOpenSnack(false)}
        ><Alert severity="error">{errorMessage}</Alert></Snackbar>
      </Container>
    </>
  )
}

export default Notes