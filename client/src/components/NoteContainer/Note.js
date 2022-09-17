import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { grey } from '@mui/material/colors';
import {
  FormGroup,
  IconButton,
  FormControlLabel,
  Checkbox,
  Card,
  CardActions,
  CardContent,
  Typography,
  Link,
} from '@mui/material/';
import {useState} from 'react';
import Modal from './Modal';

function Note({ note, onDelete, onCheck, saveEditedNote }) {
  const [open, setOpen] = useState(false);

  return (
    <Card sx={{ 
            width: '95%',
            my: 2,
            mx: 'auto',
            backgroundColor: note.color,
            transition: 'background-color 0.5s ease',
        }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {note.title}
            </Typography>
            {note.toDoList.length === 0 ? (//condition for showing text field or a list
              <Typography variant='body2' sx={{whiteSpace: 'pre-wrap'}}>{note.textField}</Typography>
            ) : (
              <FormGroup>
                {note.toDoList.map((element, i) => (
                    (i < 8) ? (//condition for displaying only first 8 items in case if it's more than that, it just shows button for more
                      <FormControlLabel
                        key={element._id}
                        label={element.value}
                        control={
                          <Checkbox
                            sx={{color: grey[800], '&.Mui-checked': {color: grey[900],}}}
                            size='small'
                            checked={element.checked}
                            onChange={() => onCheck(note._id, element._id, !element.checked)}/>
                        }
                      />
                    ) : (i === 8) && <Link key={'more'} underline='hover' onClick={() => setOpen(true)}><Typography>...</Typography></Link>
                ))}
              </FormGroup>
            )}
        </CardContent>
        <CardActions sx={{justifyContent: 'space-between'}}>
            <IconButton size='small' onClick={() => setOpen(true)}><EditIcon /></IconButton>
            <IconButton size='small' color='error' onClick={() => onDelete(note._id)}><DeleteOutlineIcon /></IconButton>
        </CardActions>
        {open && <Modal open={open} handleClose={setOpen} note={note} saveEditedNote={saveEditedNote}/>}
    </Card>
  )
}

export default Note