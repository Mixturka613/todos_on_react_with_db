import { useState } from 'react'

function TodosList(props) {

    let [AddValue, setAddValue] = useState('')

    return (
        <div className="add">
            <input value={AddValue} onChange={(e) => { setAddValue(e.target.value)}} className="add__input" placeholder="New do..." />
            <button className="add__btn" onClick={(e) => {
                if(AddValue) {
                    props.createDo(AddValue);
                    setAddValue('')
                }
            }}>Add</button>
        </div>
    );
}

export default TodosList;