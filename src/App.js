import { useState } from 'react'

import TodosList from "./components/TodosList";
import TodosAdd from './components/TodosAdd'

//style
import './App.css'

function App() {
  const [value, setValue] = useState([])

  function changeDone(id) {
    setValue(value.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done
      }
      return todo
    }))
  }

  function deletTodo(id) {
    setValue(value.filter(item => item.id !== id))
  }

  function createDo(text) {
    setValue(value.concat([
      {id: Date.now(), done: false, text: text.toString()}
    ]))
  }

  return (
    <div className="container">

      <div className="todos">
        <h1 className="todos__title">Todos</h1>

        <TodosAdd createDo={createDo} />

        <hr />

        <ul className="list">
          {value.map(item => {
            return <TodosList item={item} key={item.id} changeDone={changeDone} deletTodo={deletTodo} />
          })}
        </ul>


      </div>

    </div>
  );
}

export default App;
