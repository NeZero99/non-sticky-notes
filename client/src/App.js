import { blue, cyan } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Notes from './pages/Notes';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import UserContext from './utils/UserContext';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser: currentUser,
    setCurrentUser: (user) => {
      setCurrentUser(user);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  useEffect(() => {
    getUser();
    console.log('test')
  }, [])

  const getUser = async() => {
    try{
      const res = await fetch('/user', {
        method: 'GET'
      });
      if(!res.ok) throw new Error(res.statusText);
      const {user} = await res.json();
      setCurrentUser(user);
    }
    catch(e){
      console.log(e);
    }
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
            <Route element={<PrivateRoutes />}>
              <Route path='/notes' element={<Notes />} />
            </Route>
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