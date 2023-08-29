import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";

interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos } :Props) => {
  return(
    <section className="w-11/12 grid grid-cols-1 md:grid-cols-2 gap-x-5 my-4">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div className={twMerge("bg-[#38489e] p-5 rounded-lg mb-4 flex flex-col h-max transition duration-500", snapshot.isDraggingOver && "bg-[#2b3778]")} ref={provided.innerRef} {...provided.droppableProps}>
            <h2 className="text-3xl text-white">Aktíve úlohy</h2>
            {todos.map((todo, index) => (
                <SingleTodo index={index}  key={todo.id} setTodos={setTodos} todo={todo} todos={todos}/>
            ))}
            {provided.placeholder}
          </div>
        )}        
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div className={twMerge("bg-[#df917a] p-5 rounded-lg mb-4 flex flex-col h-max transition duration-500", snapshot.isDraggingOver && "bg-[#cd8873]")} ref={provided.innerRef} {...provided.droppableProps}>
            <h2 className="text-3xl text-white">Dokončené úlohy</h2>
            {completedTodos.map((todo, index) => (
                <SingleTodo  index={index} key={todo.id} setTodos={setCompletedTodos} todo={todo} todos={completedTodos}/>
            ))}
            {provided.placeholder}
        </div>
        )}
      </Droppable>


    </section>
  );
}

export default TodoList;
