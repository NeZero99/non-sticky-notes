import {
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material/';

//Empty note with Loading circle
function LoadingNote() {
  return (
    <Card sx={{ 
      width: '95%',
      height: 130,
      my: 2,
      mx: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}>
      <CircularProgress color='success'/>
    </Card>
  )
}

export default LoadingNote;