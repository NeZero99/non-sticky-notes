import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {
    Snackbar,
    Alert
  } from '@mui/material';

function SnackbarFlash() {
  const [openSnack, setOpenSnack] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.state) setOpenSnack(true);
  }, [location])

  return (
    <>
    {location.state && (
      location.state.severity ? (
        <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        ><Alert severity={location.state.severity}>{location.state.message}</Alert>
        </Snackbar>
      ) : (
        <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        message={location.state.message}
        />
      )
    )}
    </>
  )
}

export default SnackbarFlash