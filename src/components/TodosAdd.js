import { useState } from 'react'

function TodosList(props) {

    const [value, setValue] = useState('')

    return (
        <div className="add">
            <input value={value} onChange={(e) => { setValue() }} className="add__input" placeholder="New do..." />
            <button className="add__btn">Add</button>
        </div>
    );
}

export default TodosList;