import { useState, useEffect } from "react"
import axios from "axios"

const url = "http://localhost:3001/notes"

const FormCreateNote = (props) => {
  return (
    <form onSubmit={props.onSendNote}>
      <input 
        type="text"
        placeholder="Input a new note..."
        onChange={props.onInputNote}
      />
      <button type="submit">create</button>
    </form>
  )
}

const NoteItem = (props) => {
  return (
    <li>{props.content}</li>
  )
}

const App = () => {
  const [inputNote, setInputNote] = useState('')
  const [notes, SetNotes] = useState(null)

  useEffect(() => {
    axios
      .get(url)
      .then(response => 
        SetNotes(response.data)
      )
  }, [])

  const handleCreateNote = (e) => {
    e.preventDefault()

    const date = new Date()
    const newNote = {
      note: inputNote,
      category: "normal",
      created_at: date.toDateString()
    }

    axios
      .post(url, newNote)
      .then(response => 
        SetNotes(notes.concat(response.data))
      )
    
    setInputNote('')
  }

  const handleInputNote = (e) => {
    setInputNote(e.target.value)
  }

  return (
    <>
      <h2>Create note</h2>
      <FormCreateNote onSendNote={handleCreateNote} onInputNote={handleInputNote} />

      <h3>All Notes</h3>
      <ul>
        {notes?.map(note => 
          <NoteItem key={note.id} content={note.note}/>
        )}
      </ul>
    </>
  )
}

export default App
