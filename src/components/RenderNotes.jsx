const CategoryNotes = ({ renderList, text }) => {
    if (renderList.every(x => !x)) {
        return (
            <div>
                <h3>{text}</h3>
                <p>No notes found in this section</p>
            </div>
        )
    }
    return (
        <div>
            <h3>{text}</h3>
            <ul>
                {renderList}
            </ul>
        </div>
    )
}

export default CategoryNotes