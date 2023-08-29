import React from "react";

interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: () => void;
}

const InputField = ({todo, setTodo, handleAdd} :Props) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    };

  return(
    <div className="flex w-11/12 relative items-center pt-4">
        <input onKeyDown={handleKeyDown} value={todo} onChange={(e) => setTodo(e.target.value)} className="w-full rounded-full px-7 py-4 text-2xl border-none transition focus:outline-none" type="text" placeholder="Zadaj úlohu" />
        <button onClick={handleAdd} className="absolute w-16 h-12 m-3 rounded-full bg-[#38489e] hover:bg-[#2b3778] transition active:scale-75 right-0 text-white">Pridaj</button>
    </div>
  );
}
export default InputField;
