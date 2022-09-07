import React from 'react'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';

function ItemForm( {item, onCheck, onDelete, changeItem, newItem} ) {
  return (
    <Box sx={{display: 'flex'}}>
        <Checkbox tabIndex={-1} checked={item.checked} onChange={() => onCheck(item._id)} />
        <Input 
          sx={{flexGrow: 1}}
          value={item.value}
          onChange={(e) => changeItem(item._id, e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && newItem()}
          autoFocus={true}
        ></Input>
        <IconButton tabIndex={-1} color='error' onClick={() => onDelete(item._id)}><DeleteOutlineIcon /></IconButton>
    </Box>
  )
}

export default ItemForm