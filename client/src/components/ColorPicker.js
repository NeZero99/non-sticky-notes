import { useState, useEffect } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { IconButton, Box } from '@mui/material';

function ColorPicker({preSelected, onColorChange}) {
    const [colors, setColors] = useState([
        {
            hex: '#ffffff',
            checked: false,
        },
        {
            hex: '#6be88c',
            checked: false,
        },
        {
            hex: '#b264e3',
            checked: false,
        },
        {
            hex: '#e3df64',
            checked: false,
        },
        {
            hex: '#e39064',
            checked: false,
        },
        {
            hex: '#6475e3',
            checked: false,
        },
        {
            hex: '#e37971',
            checked: false,
        },
    ])

    useEffect(() => {
        if(preSelected === ''){
            const i = Math.floor(Math.random() * 7);
            preSelected = colors[i].hex;
        }
        selectColor(preSelected)
    }, [preSelected])

    const selectColor = (hex) => {
        setColors(colors.map(color => {
            if(color.checked) color.checked = false;
            if(color.hex === hex) color.checked = true;
            return color;
        }))
        onColorChange(hex)
    }

    const borderToggle = (checked) => {
        if(checked) return '2px solid black';
        return 'none';
    }

  return (
    <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }}>
        {colors.map(color => (
            <IconButton
                key={color.hex}
                sx={{
                    color: color.hex,
                    px: 0.5,
                }}
                onClick={() => selectColor(color.hex)}
            >
                <CircleIcon 
                    sx={{border: borderToggle(color.checked),
                    borderRadius: '100px'}} 
                />
            </IconButton>
        ))}
    </Box>
  )
}

export default ColorPicker