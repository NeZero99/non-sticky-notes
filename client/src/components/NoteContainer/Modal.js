import {Box, Modal, TextField, Button} from '@mui/material/';
import ItemForm from '../NoteForm/ItemForm';
import nextId from "react-id-generator";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ColorPicker from '../ColorPicker'
import {useState, useEffect, useRef} from 'react'

//Modal for editing a note
export default function BasicModal({open, handleClose, note, saveEditedNote}) {
  //states for note fields
  const [noteEditTitle, setNoteEditTitle] = useState(note.title);
  const [noteEditList, setNoteEditList] = useState(note.toDoList);
  const [noteColor, setNoteColor] = useState(note.color);
  const [noteText, setNoteText] = useState(note.textField);
  //state for checking is note edited
  const isEdited = useRef(false);
  //media queries for responsive design
  const mediaMatch = window.matchMedia('(min-width: 500px)');
  const [matches, setMatches] = useState(mediaMatch.matches);
  //title validation state
  const [titleError, setTitleError] = useState(false);

  //listener for screen size change
  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addEventListener("resize", handler);
    return () => mediaMatch.removeEventListener("resize", handler);
  });

  //changing value of the item
  const changeItem = (itemId, value) => {
    isEdited.current = true;
    setNoteEditList(noteEditList.map(item => {
      if(item._id === itemId) item.value = value;
      return item
    }));
  }
  
  //deleting item
  const onDelete = (itemId) => {
    isEdited.current = true;
    setNoteEditList(noteEditList.filter(item => item._id !== itemId))
  }

  //changing state of the checkbox
  const onCheck = (itemId) => {
    isEdited.current = true;
    setNoteEditList(noteEditList.map(item => {
      if(item._id === itemId) item.checked = !item.checked;
      return item
    }))
  }

  //adding new empty item
  const newItem = () => {
    isEdited.current = true;
    const tempItem = {
      _id: nextId(),
      value: '',
      checked: false
    };
    setNoteEditList([...noteEditList, tempItem]);
  }

  //function for determining is string empty
  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  }

  //adjusting note object and calling save to DB function. Also handle close
  const sendtNoteToSave = () => {
    if(isEmptyOrSpaces(noteEditTitle)) setTitleError(true);
    else{
      handleClose(false);
      if(isEdited.current){
        const newNote = {
          title: noteEditTitle,
          toDoList: noteEditList,
          color: noteColor,
          textField: noteText,
        }
        saveEditedNote(newNote, note._id);
      }
    }
  }

  //editing note title
  const editTitle = (title) => {
    isEdited.current = true;
    setNoteEditTitle(title);
  }

  //changing color
  const colorChange = (color) => {
    isEdited.current = true;
    setNoteColor(color);
  }

  //editing text field (if it's not a list)
  const editText = (e) => {
    isEdited.current = true;
    setNoteText(e.target.value);
    if(titleError) setTitleError(false)
  }

  //styling for modal
  const style = {
    container: matches => ({
      width: matches ? 400 : 300,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // width: 400,
      border: '2px solid #000',
      borderRadius: 20,
      boxShadow: 24,
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '80%',
    })
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={sendtNoteToSave}
      >
        <Box
          style={style.container(matches)}
          sx={{
            backgroundColor: noteColor,
            transition: 'background-color 0.5s ease',}}
          >
            <TextField
              sx={{flexGrow: 1}}
              label="Title"
              variant="outlined"
              autoComplete='off'
              error={titleError}
              helperText={titleError && 'Title is required!'}
              value={noteEditTitle}
              onChange={(e) => editTitle(e.target.value)}
              autoFocus={true}
            />
            {note.toDoList.length === 0 ? (//condition for showing text field or a list
              <TextField
                sx={{mt: 2}}
                label="Text"
                multiline
                rows={4}
                value={noteText}
                onChange={editText}
              />
            ) : (
              <>
                <Box sx={{mt: 2, overflow: 'auto'}}>
                  {noteEditList.map(item => (
                    <ItemForm key={item._id} item={item} onCheck={onCheck} onDelete={onDelete} changeItem={changeItem} newItem={newItem}/>
                  ))}
                </Box>
                <Button sx={{mt: 1, color: 'black'}} onClick={newItem}><AddCircleIcon /></Button>
              </>
            )}
            <Box sx={{backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 50, mt: 2}}>
              <ColorPicker preSelected={noteColor} onColorChange={colorChange} />
            </Box>
        </Box>
      </Modal>
    </div>
  );
}
