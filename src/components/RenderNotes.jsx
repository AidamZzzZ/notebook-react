const CategoryNotes = ({ renderList, text }) => {
    if (renderList.every(x => !x)) {
        return (
            <section className="mt-3">
                <h3>{text}</h3>
                <p>No notes found in this section</p>
            </section>
        )
    }
    return (
        <section className="mt-3">
            <h3 className="text-3xl font-bold mb-2">{text}</h3>
            <ul>
                {renderList}
            </ul>
        </section>
    )
}

export default CategoryNotes