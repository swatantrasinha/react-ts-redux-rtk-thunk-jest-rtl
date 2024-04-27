import React, { useRef } from 'react'
import './TodoForm.css'

type TodoFormProps= {
    onAddTodo: (totoText:string) => void
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
    const textInputRef= useRef<HTMLInputElement>(null);
   


    const todoSubmitHandler = (event: any) => {
        event.preventDefault();
        const {onAddTodo} = props;
        const enteredText= textInputRef.current!.value;
        onAddTodo(enteredText);
        textInputRef.current!.value='';
    }

  return (
    <form onSubmit={todoSubmitHandler}>  
        <div>
            <label htmlFor='todo-text'>Todo Text</label>
            <input type="text" id='todo-text' ref={textInputRef}  />
        </div>
        <button type="submit">Add ToDo</button>
    </form>
  )
}

export default TodoForm;
