import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './Notes';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/notes' element={<Notes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App