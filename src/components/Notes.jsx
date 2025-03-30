const FormNote = (props) => {
  return (
    <form onSubmit={props.onSendNote}>
      <label htmlFor="">
        <input 
          type="text"
          placeholder="Input a new note..."
          onChange={props.onInputNote}
          value={props.value}
        />
      </label>
      <label htmlFor="category">
        <select name="category" id="category" value={props.valueSelect} onChange={props.onSelect}>
          <option value="">select</option>
          <option value="job">Job</option>
          <option value="home">Home</option>
          <option value="study">Study</option>
          <option value="finances">Finances</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
      </label>
      <button type="submit">{props.text}</button>
    </form>
  )
}

const NoteItem = ({content, onDeleteNote, showDeleteButton = true}) => {
  return (
    <li>
      <span>{content}</span>
      {showDeleteButton && <button onClick={onDeleteNote}>delete</button>}
    </li>
  )
}

export {FormNote, NoteItem}