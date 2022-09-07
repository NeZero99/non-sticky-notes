import React, {useState} from 'react'
import ItemForm from './ItemForm';
import nextId from "react-id-generator";
import { CardContent, Card, Button, TextField, CardActions, Dialog, DialogTitle, DialogActions, FormControlLabel, Switch } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ColorPicker from '../ColorPicker';


function NoteForm( {saveNote} ) {
    const [newTitle, setNewTitle] = useState('');
    const [addedItems, setAddedItems] = useState([]);
    const [noteStart, setNoteStart] = useState(false);
    const [noteColor, setNoteColor] = useState('');
    const [noteText, setNoteText] = useState('');
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const newItem = () => {
        const newI = {
            _id: nextId(),
            value: '',
            checked: false
        }
        setAddedItems([...addedItems, newI])
    }
    
    const toggleCheck = (id) => {
        setAddedItems(addedItems.map(item => {
            if(item._id === id) item.checked = !item.checked
            return item
        }))
    }
    
    const deleteItem = (id) => {
        setAddedItems(addedItems.filter(e => e._id !== id))
        if(addedItems.length === 1) setNoteStart(false);
    }
    
    const addNote = () => {
        const newNote = {
            _id: nextId(),
            title: newTitle,
            toDoList: addedItems,
            color: noteColor,
            textField: noteText,
        }
    
        saveNote(newNote)
    
        resetForm();
    }

    const changeItem = (id, value) => {
        setAddedItems(addedItems.map(item => {
            if(item._id === id) item.value = value;
            return item
        }))
    }

    const startNewNote = () => {
        if(!noteStart) {
            if(showCheckbox) newItem();
            setNoteStart(true);
        }
    }

    const textCheckBoxTransition = () => {
        if(showCheckbox){
            let anyChecked = false;
            for(let i = 0; i < addedItems.length; i++) {
                if(addedItems[i].checked){
                    setDialogOpen(true);
                    anyChecked = true;
                    break;
                }
            }
            if(!anyChecked) handleListToText();
        }
        else{
            const lines = noteText.split('\n');
            let items = []
            lines.forEach(line => {
                const newI = {
                    _id: nextId(),
                    value: line,
                    checked: false,
                }
                items.push(newI);
            })
            setAddedItems(items);
            setNoteText('');
            setShowCheckbox(true);
        }
    }

    const handleListToText = (keepChecked = false) => {
        let allText = ''
        addedItems.forEach((item, i) => {
            if(!keepChecked && item.checked) return;
            if(i === addedItems.length - 1) allText += item.value;
            else allText += `${item.value}\n`;
        })
        setNoteText(allText);
        setAddedItems([]);
        setShowCheckbox(false);
        setDialogOpen(false);
    }

    const resetForm = () => {
        setNewTitle('');
        setAddedItems([]);
        setNoteStart(false);
        setNoteColor('');
        setNoteText('');
    }

    return (
        <Card sx={{
                minWidth: 200,
                maxWidth: 400,
                mx: 'auto',
                my: 4,
                backgroundColor: noteColor,
                transition: 'background-color 0.5s ease',
            }}
            onKeyDown={(e) => e.key === 'Escape' && resetForm()}
            >
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TextField
                    label={noteStart ? 'Title' : 'Add a note'}
                    placeholder='Title'
                    variant="outlined"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onFocus={startNewNote}
                />
                {noteStart && (
                    <FormControlLabel
                    control={
                        <Switch
                            checked={showCheckbox}
                            onChange={textCheckBoxTransition}
                        />
                    }
                    label="List"
                />
                )}
                {showCheckbox ? (
                    addedItems.map(item => (
                        <ItemForm
                        key={item._id}
                        item={item}
                        onCheck={toggleCheck}
                        onDelete={deleteItem}
                        changeItem={changeItem}
                        newItem={newItem} />
                    ))
                ) : (noteStart && (
                        <TextField
                            label="Text"
                            multiline
                            rows={4}
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        />
                    ))
                }
                {addedItems.length > 0 && (
                    <Button sx={{mt: 1, color: 'black'}} onClick={newItem}><AddCircleIcon /></Button>
                )}
            </CardContent>
            {noteStart && (
                <CardActions sx={{justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                    <ColorPicker preSelected={noteColor} onColorChange={setNoteColor} />
                    <Button
                        onClick={addNote}
                        size='small'
                        sx={{color: 'black'}}
                    >Save</Button>
                </CardActions>
            )}
            <Dialog
                open={dialogOpen}
                onClose={setDialogOpen}
            >
                <DialogTitle>
                    Do you want to delete checked items?
                </DialogTitle>
                <DialogActions>
                <Button onClick={() => handleListToText(false)}>Delete</Button>
                <Button onClick={() => handleListToText(true)} autoFocus>
                    Keep
                </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default NoteForm