import {Box, Modal, TextField, Button} from '@mui/material/';
import ItemForm from '../NoteForm/ItemForm';
import nextId from "react-id-generator";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ColorPicker from '../ColorPicker'
import {useState, useEffect} from 'react'

export default function BasicModal({open, handleClose, note, saveEditedNote}) {
  const [noteEditTitle, setNoteEditTitle] = useState(note.title);
  const [noteEditList, setNoteEditList] = useState(note.toDoList);
  const [noteColor, setNoteColor] = useState(note.color);
  const [noteText, setNoteText] = useState(note.textField);
  const [isEdited, setIsEdited] = useState(false);
  //media queries
  const mediaMatch = window.matchMedia('(min-width: 500px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addEventListener("resize", handler);
    return () => mediaMatch.removeEventListener("resize", handler);
  });

  const changeItem = (itemId, value) => {
    setIsEdited(true);
    setNoteEditList(noteEditList.map(item => {
      if(item._id === itemId) item.value = value;
      return item
    }));
  }

  const onDelete = (itemId) => {
    setIsEdited(true);
    setNoteEditList(noteEditList.filter(item => item._id !== itemId))
  }

  const onCheck = (itemId) => {
    setIsEdited(true);
    setNoteEditList(noteEditList.map(item => {
      if(item._id === itemId) item.checked = !item.checked;
      return item
    }))
  }

  const newItem = () => {
    setIsEdited(true);
    const tempItem = {
      _id: nextId(),
      value: '',
      checked: false
    };
    setNoteEditList([...noteEditList, tempItem]);
  }

  const sendtNoteToSave = () => {
    handleClose(false);
    if(isEdited){
      const newNote = {
        title: noteEditTitle,
        toDoList: noteEditList,
        color: noteColor,
        textField: noteText,
      }
      saveEditedNote(newNote, note._id);
    }
  }

  const editTitle = (title) => {
    setIsEdited(true);
    setNoteEditTitle(title);
  }

  const colorChange = (color) => {
    setIsEdited(true);
    setNoteColor(color);
  }

  const editText = (e) => {
    setIsEdited(true);
    setNoteText(e.target.value);
  }

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
              value={noteEditTitle}
              onChange={(e) => editTitle(e.target.value)}
              autoFocus={true}
            />
            {note.toDoList.length === 0 ? (
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
