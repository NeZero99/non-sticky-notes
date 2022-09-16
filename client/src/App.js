import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './Notes';
import Home from './Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: blue,
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/notes' element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App