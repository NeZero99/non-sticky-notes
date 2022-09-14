import {useEffect, useState, useRef} from 'react'
import LoadingNote from './LoadingNote'
import Note from './Note'
import { Box } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';

function NoteContainer({ allNotes, onDelete, onCheck, saveEditedNote }) {
  let [firstColum, setFirstColum] = useState([]);
  let [secondColum, setsecondColum] = useState([]);
  let [thirdColum, setthirdColum] = useState([]);
  let [fourthColum, setfourthColum] = useState([]);
  const windowWidth = useRef(window.innerWidth);
  const previousWindowWidth = useRef(0);

  useEffect(() => {
    updateColumns();
  }, [allNotes]);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const updateColumns = () => {
    let columnMax;
    if (windowWidth.current < 900) columnMax = 2;
    else columnMax = 4;
    let columnSelector = 1;
    let firstColumTemp = [];
    let secondColumTemp = [];
    let thirdColumTemp = [];
    let fourthColumTemp = [];
    allNotes.slice(0).reverse().forEach(note => {
      if(columnSelector === 1) firstColumTemp.push(note);
      else if(columnSelector === 2) secondColumTemp.push(note);
      else if(columnSelector === 3) thirdColumTemp.push(note);
      else if(columnSelector === 4) fourthColumTemp.push(note);
      if(columnSelector === columnMax) columnSelector = 1;
      else columnSelector++;
    })
    setFirstColum(firstColumTemp);
    setsecondColum(secondColumTemp);
    setthirdColum(thirdColumTemp);
    setfourthColum(fourthColumTemp);
  }

  const updateMedia = () => {
    windowWidth.current = window.innerWidth;
    if(windowWidth.current < 600 && previousWindowWidth.current >= 600) updateColumns();
    else if((windowWidth.current < 900 && windowWidth.current > 600) && (previousWindowWidth.current >= 900 || previousWindowWidth.current <= 600)) updateColumns();
    else if((windowWidth.current < 1200 && windowWidth.current > 900) && (previousWindowWidth.current >= 1200 || previousWindowWidth.current <= 900)) updateColumns();
    previousWindowWidth.current = windowWidth.current;
  };

  const mapNotes = (notesList) => {
    return notesList.map(note => {
      if(note._id === 'loadingNote') return <LoadingNote key={note._id}/>
      return <Note
        key={note._id}
        note={note}
        onDelete={onDelete}
        onCheck={onCheck}
        saveEditedNote={saveEditedNote}/>
    })
  }

  return (
    <Grid container spacing={1}>
      {windowWidth.current < 600 ? (
        <Grid xs={12}>
          {mapNotes(allNotes)}
        </Grid>
      ) : windowWidth.current < 900 ? (
        <>
        <Grid xs={6}>
          {mapNotes(firstColum)}
        </Grid>
        <Grid xs={6}>
          {mapNotes(secondColum)}
        </Grid>
        </>
      ) : (
        <>
        <Grid xs={3}>
          {mapNotes(firstColum)}
        </Grid>
        <Grid xs={3}>
          {mapNotes(secondColum)}
        </Grid>
        <Grid xs={3}>
          {mapNotes(thirdColum)}
        </Grid>
        <Grid xs={3}>
          {mapNotes(fourthColum)}
        </Grid>
        </>
      )}
    </Grid>
  )
  
}

export default NoteContainer