import { useState, useEffect } from "react"
import { NoteItem, FormNote } from "./components/Notes"
import CategoryNotes from "./components/RenderNotes"
import notesServices from "./services/notes"

const url = "http://localhost:3001/notes"

const App = () => {
  const [inputSearch, setInputSearch] = useState('')
  const [inputNote, setInputNote] = useState('')
  const [search, setSearch] = useState(false)
  const [categoryNote, setCategoryNote] = useState('other')
  const [filteredNotes, setFilteredNotes] = useState([])
  const [error, setError] = useState('')
  const [notes, setNotes] = useState(null)
  const categorys = ["job", "home", "study", "finances", "health", "other"]

  useEffect(() => {
    notesServices
      .getAll(url)
      .then(response => {
        setNotes(response)
        setFilteredNotes(response)
      })
  }, [])

  useEffect(() => {
    const hasQuery = inputSearch.trim() !== ""
    setSearch(hasQuery)

    const filterNotes = notes?.filter(note => note.note.toLowerCase().startsWith(inputSearch.toLowerCase()))
    setFilteredNotes(filterNotes)
  }, [inputSearch, notes])

  const handleCreateNote = (e) => {
    e.preventDefault()
    if (inputNote.trim() === "" || categoryNote === "") {

      setError("Complete all fields correctly")
    } else {
      e.preventDefault()

      const date = new Date()
      const newNote = {
        note: inputNote,
        category: categoryNote,
        created_at: date.toDateString()
      }

      notesServices
        .created(url, newNote)
        .then(response => 
          setNotes(notes.concat(response))
        )
        .catch(error => console.log(error))
      
      setError('')
      setInputNote('')
      setCategoryNote('')
    }
  }
  
  const handleDeleteNote = (id) => {
    notesServices
      .deleted(url, id)
      .then(response =>
        setNotes(notes.filter(note => note.id !== response.id))
      )
      .catch(error => console.log(error))
  }

  const handleInputNote = (e) => {
    setInputNote(e.target.value)
  }

  const handleInputSearchNote = (e) => {
    setInputSearch(e.target.value)
  }

  const handleChangedCategory = (e) => {
    setCategoryNote(e.target.value)
  }

  const filterCategoryNotes = (category, showButton = false) => {
    if (category) {
      const filterNotes = notes?.map(note => note.category === category && 
        <NoteItem key={note.id} content={note.note} showDeleteButton={showButton} category={category}/>)
      return filterNotes || []
    }
    const filterNotes = filteredNotes?.map(note => <NoteItem key={note.id} content={note.note} onDeleteNote={() => handleDeleteNote(note.id)} category={note.category}/>)
    return filterNotes || []
  }

  return (
    <div className="flex text-white">
      <div className="border-r-blue-200 border-r-1 h-screen p-3 min-w-[425px]">
        <aside className="border-2 rounded-xl p-3">
          <h2 className="text-2xl font-bold">Create note</h2>
            {error && <p className="font-bold text-red-600">{error}</p>}
            <FormNote 
              onSendNote={handleCreateNote} 
              onInputNote={handleInputNote} 
              onSelect={handleChangedCategory}
              valueSelect={categoryNote}
              value={inputNote} 
              text="create"/>
        </aside>
        <nav className="border-2 mt-2 rounded-xl p-2">
          <h2 className="text-2xl font-bold">Search notes</h2>
          <label htmlFor="">
            <input className="border-b-2 outline-none" type="text" placeholder="Search a note..." onChange={handleInputSearchNote} />
          </label>

          <h3 className="mt-2 text-2xl font-semibold">{search ? "Search" : "All notes"}</h3>
          <CategoryNotes message="No hay notas" renderList={filterCategoryNotes()}/>
        </nav>
      </div>
      <div className="p-5 w-full max-w-full">
        <header className="mb-5">
          <h1 className="text-6xl font-bold">My Notes</h1>
        </header>
        <main>
          {categorys.map(category => 
            <CategoryNotes text={category + " Notes"} renderList={filterCategoryNotes(category)}/>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
