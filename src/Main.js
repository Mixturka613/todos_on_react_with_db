import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import TodosList from "./components/TodosList";
import TodosAdd from './components/TodosAdd'

//Logica
import { SendMess, deleteDo, updateDo } from './components/Update.js'

//style
import './App.css'
import Loader from './components/Loader';

function App() {
  const [value, setValue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tocken = Cookies.get('tocken')

    fetch('http://192.168.1.4:5050/api/todo', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tocken: tocken
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          window.location.replace(`/login`);
        }
        let obj = [];
        data.forEach(item => {
          obj.push({
            id: item.idDo,
            text: item.text,
            done: item.done
          })
        })

        if (obj.length !== 0) {
          setValue(obj)
        }

        setLoading(false)
      })
      .catch(e => {
        console.log(e)
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
    updateDo(id, Cookies.get('tocken'))
  }

  function deletTodo(id) {
    setValue(value.filter(item => item.id !== id))
    deleteDo(id, Cookies.get('tocken'))
  }

  async function createDo(text) {
    const newDo = { id: Date.now(), done: false, text: text.toString() }
    setValue(value.concat([
      newDo
    ]));
    SendMess({
      ...newDo,
      tocken: Cookies.get('tocken')
    })
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
