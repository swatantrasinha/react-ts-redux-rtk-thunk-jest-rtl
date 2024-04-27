import { useState } from 'react'
import './App.css'
import TodoList from './components/todo/TodoList';
import TodoForm from './components/todo/TodoForm';
import TodoType from './types/TodoType';
import Person from './components/Person'

function App() {
  const [todos,setTodos]= useState<TodoType[]>([]);
  const todoAddHandler= (text:string) => {
    const todo= {
      id: Math.random().toString(),
      text: text
    }
      setTodos(prevTodos => [...prevTodos, todo]);
  };

  const todoDeleteHandler= (deleteTodoId:string) => {
      setTodos(prevTodos => {
        return prevTodos.filter(ele => ele.id !== deleteTodoId)
      })
  }
  

  return (
    <>
      <h1>TODO App</h1>
      <hr />
      <Person firstName='Nathan' lastName='Krasney' />
      <hr />
      <TodoForm onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
  
    </>
  )
}

export default App
