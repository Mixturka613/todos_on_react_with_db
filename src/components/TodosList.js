function TodosList(props) {
    let classes = [];
    if (props.item.done) {
        classes.push('done')
    }
    return (
        <li className="list__item">
            <input id={props.item.id} onChange={() => { props.changeDone(props.item.id) }} className="list__itme-done" type="checkbox"></input>

            <label for={props.item.id} className="list__text">
                <h4 className={"list__item-text " + classes.join('')}>{props.item.text}</h4>
            </label>

            <button onClick={(e) => { props.deletTodo(props.item.id) }} className="list__delet-item"></button>
        </li>
    );
}

export default TodosList;