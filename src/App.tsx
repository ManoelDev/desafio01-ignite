import { useEffect, useState } from 'react'

import Clipboard from './assets/Clipboard.svg'

import Header from './components/Header'
import './global.css'

import styles from './App.module.css'
import { Input } from './components/Input'
import { Todo } from './components/Todo'
import axiosInstance from './utils/axios'

type TaskProps = {
  id: number,
  status: boolean,
  content: string,
  created_at: Date,
}

function App() {
  const [todos, setTodos] = useState<TaskProps[]>([])
  const [inputValue, setInputValue] = useState('')

  async function getData() {
    const response = await axiosInstance.get('/todos')
    if (response.status === 200) {
      const { data } = response
      setTodos(data)
    }
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    axiosInstance.delete(`/todos/${id}`)
  }

  function handleChangeStatus(id: number) {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status }
      }
      return todo
    })
    setTodos(newTodos)
  }

  async function creatTodo() {
    event?.preventDefault()
    if (inputValue.trim() === '') {
      return
    }
    const response = await axiosInstance.post('/todos', {
      content: inputValue,
      status: false,
    })
    if (response.status === 201) {
      const { data } = response
      setTodos([...todos, data])
      setInputValue('')
    }
  }



  useEffect(() => { getData() }, [])

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main >
          <form onSubmit={creatTodo}>
            <Input placeholder='Adicione uma nova tarefa' onChange={(e) => setInputValue(e.currentTarget.value)} value={inputValue} />
            <button type='submit' >
              Criar
            </button>
          </form>
          <div className={styles.todoList}>
            <header>
              <span>Tarefas criadas <span>{todos.length}</span></span>
              <span>Concluídas <span>{todos.filter(({ status }) => status === true).length}</span></span>
            </header>

            {!todos.length && (
              <div className={styles.noTodo}>
                <img src={Clipboard} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )}


            {todos
              .filter(({ status }) => status === false)
              .sort((a, b) => b.id - a.id)
              .map(todo => (
                <Todo key={todo.id} {...todo} deleteTodo={deleteTodo} changeStatus={handleChangeStatus} />
              ))
            }
            {todos
              .filter(({ status }) => status === true)
              .sort((a, b) => b.id - a.id)
              .map(todo => (
                <Todo key={todo.id} {...todo} deleteTodo={deleteTodo} changeStatus={handleChangeStatus} />
              ))
            }
          </div>
        </main>
      </div>
    </>
  )
}

export default App
