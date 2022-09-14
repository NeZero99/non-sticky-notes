import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useState} from 'react';
import Modal from './Modal';

function Note({ note, onDelete, onCheck, saveEditedNote }) {
  const [open, setOpen] = useState(false);

  return (
    <Card sx={{ 
            minWidth: '95%',
            margin: 2,
            backgroundColor: note.color,
            transition: 'background-color 0.5s ease',
        }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {note.title}
            </Typography>
            {note.toDoList.length === 0 ? (
              <Typography variant='body2' sx={{whiteSpace: 'pre-wrap'}}>{note.textField}</Typography>
            ) : (
              <FormGroup>
                {note.toDoList.map((element, i) => (
                    (i < 8) ? (
                      <FormControlLabel
                        key={element._id}
                        label={element.value}
                        control={
                          <Checkbox
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