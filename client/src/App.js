import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, blue } from '@mui/material/colors';
import Register from './pages/Register';
import Login from './pages/Login';
import UserContext from './UserContext';

function App() {
  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser
  }

  //adjusting theme colors
  const theme = createTheme({
    palette: {
      primary: cyan,
      secondary: blue,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App