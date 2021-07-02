function TodosList(props) {
    let classes = [];
    if (props.item.done) {
        classes.push('done')
    }
    return (
        <li className="list__item">
            <input onChange={() => { props.changeDone(props.item.id) }} className="list__itme-done" type="checkbox"></input>

            <h4 className={"list__item-text " + classes.join('')}>{props.item.text}</h4>

            <button onClick={(e) => { props.deletTodo(props.item.id) }} className="list__delet-item"></button>
        </li>
    );
}

export default TodosList;