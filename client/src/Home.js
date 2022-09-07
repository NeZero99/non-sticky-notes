import NoteForm from './components/NoteForm'
import NavBar from './components/NavBar'
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  const saveNote = async (newNote) => {
    const res = await fetch('/notes', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify(newNote)
    });

    if(res.ok) navigate("/notes");
  }

  return (
    <>
      <NavBar />
      <NoteForm saveNote={saveNote} />
    </>
  )
}

export default Home