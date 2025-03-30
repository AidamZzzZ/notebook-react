const CategoryNotes = ({ renderList, text }) => {
    if (renderList.every(x => !x)) {
        return (
            <div className="mt-3">
                <h3>{text}</h3>
                <p>No notes found in this section</p>
            </div>
        )
    }
    return (
        <div className="mt-3">
            <h3 className="text-3xl font-bold mb-2">{text}</h3>
            <ul>
                {renderList}
            </ul>
        </div>
    )
}

export default CategoryNotes