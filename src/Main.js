import { useState, useEffect } from 'react'

import TodosList from "./components/TodosList";
import TodosAdd from './components/TodosAdd'

//style
import './App.css'
import Loader from './components/Loader';

function App() {
  const [value, setValue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5050/api/todo')
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          window.location.replace(`/login`);
        }
        setLoading(false)
      })
      .catch(e => {
        console.log("Ошибка запроса")
      })
  }, [])

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
      { id: Date.now(), done: false, text: text.toString() }
    ]))
  }

  return (
    <div className="container">

      <div className="todos">
        <h1 className="todos__title">Todos</h1>

        <TodosAdd createDo={createDo} />

        <hr />

        <ul className="list">

          {loading ? (
            <Loader />
          ) : (
            value.length ? (
              value.map(item => {
                return <TodosList item={item} key={item.id} changeDone={changeDone} deletTodo={deletTodo} />
              })
            ) : (
              <p className="clear_todo">None...</p>
            )
          )
          }
        </ul>

      </div>

    </div>
  );
}

export default App;
