import React, { useState, useEffect } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from "react-beautiful-dnd"

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedCompletedTodos = localStorage.getItem('completedTodos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos,completedTodos])

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos,todos])
 
  
  const handleAdd = () => {
    if(todo){
      setTodos([...todos, {id: Date.now(), isDone: false, todo:todo}])
      setTodo("")
    }
  }

  const onDragEnd = (result:DropResult) => {
    // console.log(result)
    const { source, destination } = result

    if(!destination) return

    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add:Todo, active = todos, complete = completedTodos

    if(source.droppableId === "TodosList"){
      add=active[source.index]
      active.splice(source.index, 1)
    }else {
      add=complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === "TodosList"){
      active.splice(destination.index, 0, add)
      setTodos(todos.map(todo => (
        todo.id === add.id? { ...todo, isDone: false } : todo
      )))
    }else {
      complete.splice(destination.index, 0, add)
      setCompletedTodos(completedTodos.map(todo => (
        todo.id === add.id? { ...todo, isDone: true } : todo
      )))
    }
  }

  const deleteAllTodos = () => {
    setTodos([])
    setCompletedTodos([])
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='w-screen h-screen bg-[#e9d3d5] flex flex-col items-center'>
        <div className='relative w-11/12 flex justify-center items-center'>
          <h1 className='uppercase text-4xl mt-8 text-white'>Úlohy</h1>
          <button className='absolute right-0 bottom-0 text-sm mr-2' onClick={deleteAllTodos}>Reset</button>
        </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} todos={todos} setTodos={setTodos} />
      </div>
    </DragDropContext>

  )
}

export default App
