import clsx from "clsx"

const FormNote = (props) => {
  return (
    <form onSubmit={props.onSendNote}>
      <label htmlFor="">
        <input 
          className="border-b-2 outline-none"
          type="text"
          placeholder="Input a new note..."
          onChange={props.onInputNote}
          value={props.value}
        />
      </label>
      <label htmlFor="category">
        <select className="cursor-pointer bg-gray-700 py-1 ml-1 rounded-sm hover:bg-gray-800 transition-colors ease-in" name="category" id="category" value={props.valueSelect} onChange={props.onSelect}>
          <option value="">select</option>
          <option value="job">Job</option>
          <option value="home">Home</option>
          <option value="study">Study</option>
          <option value="finances">Finances</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
      </label>
      <button className="cursor-pointer ml-1 bg-blue-800 hover:bg-blue-900 transition-colors ease-in p-1 rounded-sm" type="submit">{props.text}</button>
    </form>
  )
}

const NoteItem = ({content, category, onDeleteNote, showDeleteButton = true}) => {
  return (
    <li className={clsx(
      "bg-gray-800 p-1 mb-2 rounded-sm flex justify-between w-full",
      {
        "bg-yellow-600": category === "job",
        "bg-sky-700": category === "study",
        "bg-green-700": category === "home",
        "bg-yellow-500": category === "finances",
        "bg-red-500": category === "health"
      }
    )}>
      <span className="overflow-hidden">{content}</span>
      {showDeleteButton && <button className="cursor-pointer border-transparent border-1 hover:border-b-1 hover:border-b-white transition-all ease-in" onClick={onDeleteNote}>delete</button>}
    </li>
  )
}

export {FormNote, NoteItem}