import React, {useState} from 'react'
import ItemForm from './ItemForm';
import nextId from "react-id-generator";
import {
    CardContent,
    Card,
    Button,
    TextField,
    CardActions,
    Dialog,
    DialogTitle,
    DialogActions,
    FormControlLabel,
    Switch,
    Collapse,
    Box,
    Snackbar,
    Alert
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ColorPicker from '../ColorPicker';
import { grey } from '@mui/material/colors';

//component for creating a new note
function NoteForm( {saveNote} ) {
    //states for note fields
    const [newTitle, setNewTitle] = useState('');
    const [addedItems, setAddedItems] = useState([]);
    const [noteColor, setNoteColor] = useState('');
    const [noteText, setNoteText] = useState('');
    //stete for checking is input started
    const [noteStart, setNoteStart] = useState(false);
    //state for switching between list and text field
    const [showCheckbox, setShowCheckbox] = useState(false);
    //state for opening dialog when switching between list and text field in case of existing checked items
    const [dialogOpen, setDialogOpen] = useState(false);
    //snackbar open state
    const [snackOpen, setSnackOpen] = useState(false);

    //creating a new item
    const newItem = () => {
        const newI = {
            _id: nextId(),
            value: '',
            checked: false
        }
        setAddedItems([...addedItems, newI])
    }
    
    //updating checkbox state
    const toggleCheck = (id) => {
        setAddedItems(addedItems.map(item => {
            if(item._id === id) item.checked = !item.checked
            return item
        }))
    }
    
    //deleting item
    const deleteItem = (id) => {
        setAddedItems(addedItems.filter(e => e._id !== id))
        if(addedItems.length === 1) setNoteStart(false);
    }

    //function for determining is string empty
    const isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    }
    
    //cheking is note empty before submiting
    const isNoteEmpty = () => {
        let emptyItems = true;
        addedItems.forEach(item => {
            if(!isEmptyOrSpaces(item.value)) {
                console.log(item.value);
                emptyItems = false;
            }
        })
        if(!emptyItems) return false
        if(!isEmptyOrSpaces(newTitle)) return false;
        else if(!isEmptyOrSpaces(noteText)) return false;
        return true;
    }

    //adjusting note object, calling save note to DP function and reseting form
    const addNote = () => {
        if(isNoteEmpty()) setSnackOpen(true);//opening snackbar if note is empty
        else{
            const newNote = {
                title: newTitle,
                toDoList: addedItems,
                color: noteColor,
                textField: noteText,
            }
            saveNote(newNote)
        }
        resetForm();
    }

    //changing item value
    const changeItem = (id, value) => {
        setAddedItems(addedItems.map(item => {
            if(item._id === id) item.value = value;
            return item
        }))
    }

    //setting states when new note is started
    const startNewNote = () => {
        if(!noteStart) {
            if(showCheckbox) newItem();
            setNoteStart(true);
        }
    }

    //switching items and text between text field and list
    const textCheckBoxTransition = () => {
        if(showCheckbox){//every item is a new row on text field
            let anyChecked = false;
            for(let i = 0; i < addedItems.length; i++) {
                if(addedItems[i].checked){
                    setDialogOpen(true);
                    anyChecked = true;
                    break;
                }
            }
            if(!anyChecked) handleListToText();// opens dialiog to ask if checked items should be kept
        }
        else{//every new line of text field sets as a new item in the list
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

    const handleListToText = (keepChecked = false) => {//handling dialog result
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

    const resetForm = () => {//reseting form values
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
                    label='Take a Note'
                    placeholder='Title'
                    variant="outlined"
                    autoComplete='off'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onFocus={startNewNote}
                />
                <Collapse in={noteStart}>
                    {/* transition */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <FormControlLabel
                        control={//switch that controls what is shown
                            <Switch
                                checked={showCheckbox}
                                onChange={textCheckBoxTransition}
                                color='primary'
                            />
                        }
                        label="List"
                        />
                        {showCheckbox ? (//showing list or text field
                            addedItems.map(item => (
                                <ItemForm
                                key={item._id}
                                item={item}
                                onCheck={toggleCheck}
                                onDelete={deleteItem}
                                changeItem={changeItem}
                                newItem={newItem} />
                            ))
                            ) : (
                                <TextField
                                    label="Text"
                                    multiline
                                    rows={4}
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                />
                            )
                        }
                    </Box>
                </Collapse>
                {addedItems.length > 0 && (
                    <Button sx={{mt: 1, color: 'black'}} onClick={newItem}><AddCircleIcon /></Button>
                )}
            </CardContent>
            <Collapse in={noteStart}>
                {/* transition */}
                <CardActions sx={{justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                    <ColorPicker preSelected={noteColor} onColorChange={setNoteColor} />
                    <Button
                        onClick={addNote}
                        size='small'
                        sx={{color: 'black'}}
                    >Save</Button>
                </CardActions>
            </Collapse>
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
            <Snackbar
                open={snackOpen}
                autoHideDuration={3000}
                onClose={() => setSnackOpen(false)}
            ><Alert severity="info">Empty note will not be saved</Alert></Snackbar>
        </Card>
    )
}

export default NoteForm