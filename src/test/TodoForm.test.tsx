import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import TodoForm from '../components/todo/TodoForm'


test('shows one label one input and a button', () => {
    // render the component
    const mock= jest.fn()
    render(<TodoForm onAddTodo={mock} />);

// manipulate the component or find an element in it
   const input= screen.getAllByRole('textbox')
   const label= screen.getByLabelText(/Todo Text/i)
   const button=screen.getByRole('button', {
    name: /add todo/i
  })
  
  //  screen.logTestingPlaygroundURL();

// assertion - make sure component is doing what its expected to do
  expect(input).toHaveLength(1);
  expect(label).toBeInTheDocument();
  expect(button).toBeInTheDocument();
})

//
test('when form is submited  onAddTodo function is called - option 1 ', () => {
       // not the best implementation 
    
       const argList:any[]=[]
       const callback= (...args:any) => {
           argList.push(args)
       };

      render(<TodoForm  onAddTodo={callback } />);
      
      const input= screen.getByRole('textbox', {
         name: /todo text/i
       })
      user.click(input)
      user.keyboard('going to gym')
  
   user.keyboard('{Enter}')

   expect(argList).toHaveLength(1) // callback is called one time
   expect(argList[0][0]).toEqual('going to gym')
});
//


//
test('when form is submited  onAddTodo function is called - option2', () => {
   const mock= jest.fn()

   // try to render component
       render(<TodoForm onAddTodo={mock} />);

      const textInput= screen.getByRole('textbox', {
        name: /todo text/i
      })

      const button=screen.getByRole('button', {
        name: /add todo/i
      })

   // simulate typing in a name
       user.click(textInput)
       user.keyboard('going to gym')

  
    // user.keyboard('{Enter}')
   // simulate button click
    user.click(button)

    

   // assertion to make sure onUserAdd gets called with todo-text
   expect(mock).toHaveBeenCalled()
   expect(mock).toHaveBeenCalledWith('going to gym')
})
//

