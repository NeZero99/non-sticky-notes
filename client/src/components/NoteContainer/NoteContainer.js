import React from 'react'
import LoadingNote from './LoadingNote'
import Note from './Note'
import Box from '@mui/material/Box';

function NoteContainer({ allNotes, onDelete, onCheck, saveEditedNote }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    }}>
        {allNotes.slice(0).reverse().map(note => {
            if(note._id === 'loadingNote') return <LoadingNote key={note._id}/>
            return <Note
              key={note._id}
              note={note}
              onDelete={onDelete}
              onCheck={onCheck}
              saveEditedNote={saveEditedNote}/>
        })}
    </Box>
  )
}

export default NoteContainer