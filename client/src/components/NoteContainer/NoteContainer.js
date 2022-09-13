import {useEffect, useState} from 'react'
import LoadingNote from './LoadingNote'
import Note from './Note'
import { Box } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';

function NoteContainer({ allNotes, onDelete, onCheck, saveEditedNote }) {
  let [firstColum, setFirstColum] = useState([]);
  let [secondColum, setsecondColum] = useState([]);
  let [thirdColum, setthirdColum] = useState([]);
  let [fourthColum, setfourthColum] = useState([]);

  useEffect(() => {
    let columnSelector = 1;
    let firstColumTemp = [];
    let secondColumTemp = [];
    let thirdColumTemp = [];
    let fourthColumTemp = [];
    allNotes.forEach(note => {
      if(columnSelector === 1) firstColumTemp.push(note);
      else if(columnSelector === 2) secondColumTemp.push(note);
      else if(columnSelector === 3) thirdColumTemp.push(note);
      else if(columnSelector === 4) fourthColumTemp.push(note);
      if(columnSelector === 4) columnSelector = 1;
      else columnSelector++;
    })
    setFirstColum(firstColumTemp);
    setsecondColum(secondColumTemp);
    setthirdColum(thirdColumTemp);
    setfourthColum(fourthColumTemp);
  }, [allNotes])


  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        {firstColum.map(note => {
          return <Note
                    key={note._id}
                    note={note}
                    onDelete={onDelete}
                    onCheck={onCheck}
                    saveEditedNote={saveEditedNote}/>
        })}
      </Grid>
      <Grid xs={3}>
        {secondColum.map(note => {
            return <Note
                      key={note._id}
                      note={note}
                      onDelete={onDelete}
                      onCheck={onCheck}
                      saveEditedNote={saveEditedNote}/>
          })}
      </Grid>
      <Grid xs={3}>
        {thirdColum.map(note => {
            return <Note
                      key={note._id}
                      note={note}
                      onDelete={onDelete}
                      onCheck={onCheck}
                      saveEditedNote={saveEditedNote}/>
          })}
      </Grid>
      <Grid xs={3}>
        {fourthColum.map(note => {
            return <Note
                      key={note._id}
                      note={note}
                      onDelete={onDelete}
                      onCheck={onCheck}
                      saveEditedNote={saveEditedNote}/>
          })}
      </Grid>
    </Grid>

    // <Box sx={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   flexWrap: 'wrap',
    //   alignItems: 'flex-start',
    // }}>
    //     {allNotes.slice(0).reverse().map(note => {
    //         if(note._id === 'loadingNote') return <LoadingNote key={note._id}/>
    //         return <Note
    //           key={note._id}
    //           note={note}
    //           onDelete={onDelete}
    //           onCheck={onCheck}
    //           saveEditedNote={saveEditedNote}/>
    //     })}
    // </Box>
  )
}

export default NoteContainer