import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number;
    todo : Todo;
    key: number;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos } :Props) => {
    const [update, setUpdate] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState(todo.todo);
    
    

    // const handleDone = (id:number) => {
    //     setTodos(todos.map((todo) => 
    //         todo.id === id? { ...todo, isDone: !todo.isDone } : todo
    //     ))
    // }

    const handleDelete = (id:number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleUpdate = () => {
        setUpdate((prev) => !prev)
    }

    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTodo(e.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, id:number) => {
        if (event.key === 'Enter') {
            setTodos(todos.map((oneTodo) => (
                oneTodo.id === id ? {...oneTodo, todo: updatedTodo} : oneTodo
            )))
            setUpdate(false)
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setUpdate(false);
        }
      }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        inputRef.current?.focus()
    },[update])
    
    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);
    },[])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
            <div className="flex flex-row rounded-md p-5 mt-4 bg-[#FDAF75] w-full" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                {update ? (<input className="flex-1 focus:outline-none text-xl"
                        ref={inputRef}
                        onKeyDown={(e) => handleKeyDown(e,todo.id)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTodoChange(e)} 
                        value={updatedTodo}></input>) :(!todo.isDone? (<p className="flex-1 text-xl">{todo.todo}</p>) : (<s className="flex-1 text-xl">{todo.todo}</s>))}
                <div className="flex">
                    <button onClick={() => handleUpdate()} className="ml-2 text-2xl"><AiFillEdit /></button>
                    <button onClick={() => handleDelete(todo.id)} className="ml-2 text-2xl"><AiFillDelete /></button>
                </div>
            </div>
        )}
    </Draggable>
    
  )
};

export default SingleTodo;
