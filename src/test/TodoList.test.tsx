import '@testing-library/jest-dom'
import {render, screen, getAllByRole, within, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import TodoList from '../components/todo/TodoList'



// method1- using data-testid
test('render one li per todo activity method 1', () => {
    // not a very good approach as we need to add data-testid attribute just for testcase
    const items= [
        {
            "id": "0.0013800050958578947",
            "text": "brush your teeth"
        },
        {
            "id": "0.0013800050958578948",
            "text": "take bath"
        }
        ];
    const onDeleteTodo= jest.fn();

    // render the component
    render( <TodoList items={items} onDeleteTodo={onDeleteTodo} />)

    screen.logTestingPlaygroundURL();
    
    const liItems=screen.getAllByRole('listitem')
    expect(liItems).toHaveLength(2) 

    // verify 2 span are present with required text
    const spanEle1= within(liItems[0]).getByText(/brush your teeth/i)
    expect(spanEle1).toBeInTheDocument();  

    const spanEle2= within(liItems[1]).getByText(/take bath/i)
    expect(spanEle2).toBeInTheDocument();  

    // verify 2 delete buttons are present
    const deleteButton1= within(liItems[0]).getByRole('button', {
        name: /delete/i
      })
    expect(deleteButton1).toBeInTheDocument() 

    const deleteButton2= within(liItems[1]).getByRole('button', {
        name: /delete/i
      })
    expect(deleteButton2).toBeInTheDocument() 
})


// method2- using container.querySelector()
test('render one row per user method 2', () => {
    
    const items= [
        {
            "id": "0.0013800050958578947",
            "text": "brush your teeth"
        },
        {
            "id": "0.0013800050958578948",
            "text": "take bath"
        }
        ];
    const onDeleteTodo= jest.fn();
    // render the component
    const {container} =  render( <TodoList items={items} onDeleteTodo={onDeleteTodo} />)

    // find all rows in the table

    // eslint-disable-next-line
    const liElements= container.querySelectorAll('ul li') // warning is ok 

    //assertion : correct number of rows in table 
    expect(liElements).toHaveLength(2)

     // verify 2 span are present with required text
     const spanElements= container.querySelectorAll('ul li span')
     expect(spanElements[0]).toHaveTextContent('brush your teeth')
     expect(spanElements[1]).toHaveTextContent('take bath')

      // verify 2 delete buttons are present
      const buttonElements= container.querySelectorAll('ul li button')
      expect(buttonElements[0]).toHaveTextContent('Delete')
      expect(buttonElements[1]).toHaveTextContent('Delete')
    
})

test('on delete button click one li item is vanished', async() => {
 const items= [
        {
            "id": "0.0013800050958578947",
            "text": "brush your teeth"
        },
        {
            "id": "0.0013800050958578948",
            "text": "take bath"
        }
        ];
   

    // render the component
    const argList:any[]=[]
    const callback= (...args: any[]) => {
        argList.push(args)
    };
    const onDeleteTodo= jest.fn();

    render( <TodoList items={items} onDeleteTodo={callback} />)

     const liItems=screen.getAllByRole('listitem')
    expect(liItems).toHaveLength(2) 
        const deleteButton1= within(liItems[0]).getByRole('button', {
        name: /delete/i
      })
    expect(deleteButton1).toBeInTheDocument() 

   
    await user.click(deleteButton1)
    expect(argList).toHaveLength(1) // so delete button click is called 
    // expect(onDeleteTodo).toHaveBeenCalled()

   

    // const liItemsPostDeleteClick= await screen.findAllByRole('listitem')
    // await expect(liItemsPostDeleteClick).toHaveLength(1) 

    // await waitFor(async() => { 
    //     setTimeout(async () => { // not executing 
    //         console.log("Bye World !!!");
            
    //         await screen.debug();
    //         const liItemsPostDeleteClick=await screen.findAllByRole('listitem')
    //         await expect(liItemsPostDeleteClick).toHaveLength(1)       
    //     }, 5000);
      
    // })


})
