import React from 'react'
import './TodoList.css'
import TodoListPropsType from  '../../types/TodoListPropsType'
// type TodoListProps= {
//     items: {id:string, text:string}[],
//     onDeleteTodo: (id:string) => void
// }
 const TodoList:React.FC<TodoListPropsType> = (props:TodoListPropsType) => {

//    console.log('props.items : ', props.items);

  return (
   <ul>
    {props.items.map(
        (ele) => (
            <li key={ele.id} aria-label={ele.text}>  
                <span>{ele.text}</span>
                <button 
                    onClick={() => props.onDeleteTodo(ele.id)} // correct - other way is below
                    // onClick={props.onDeleteTodo.bind(null, ele.id)} 
                    >Delete</button>
            </li>)
    )}
   </ul>
  )
}
export default TodoList;