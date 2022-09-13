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
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    let columnMax;
    if (windowWidth < 900) columnMax = 2;
    else columnMax = 4;
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
      if(columnSelector === columnMax) columnSelector = 1;
      else columnSelector++;
    })
    setFirstColum(firstColumTemp);
    setsecondColum(secondColumTemp);
    setthirdColum(thirdColumTemp);
    setfourthColum(fourthColumTemp);
  }, [allNotes]);

  const updateMedia = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

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
    <Grid container spacing={2}>
      {windowWidth < 600 ? (
        <Grid>
          {mapNotes(allNotes)}
        </Grid>
      ) : windowWidth < 900 ? (
        <>
        <Grid>
          {mapNotes(firstColum)}
        </Grid>
        <Grid>
          {mapNotes(secondColum)}
        </Grid>
        </>
      ) : (
        <>
        <Grid>
          {mapNotes(firstColum)}
        </Grid>
        <Grid>
          {mapNotes(secondColum)}
        </Grid>
        <Grid>
          {mapNotes(thirdColum)}
        </Grid>
        <Grid>
          {mapNotes(fourthColum)}
        </Grid>
        </>
      )}
    </Grid>
  )
  
}

export default NoteContainer