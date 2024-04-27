type TodoListPropsType= {
    items: {id:string, text:string}[],
    onDeleteTodo: (id:string) => void
}

export default TodoListPropsType;