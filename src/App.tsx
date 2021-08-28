import React, {useState, Fragment, HTMLAttributeAnchorTarget} from 'react';
import './App.css';

/* crio um 'alias' para o evento disparado pelo form e atribuo um tipo
que esse evento va receber, no nosso caso: 'HTMLFormElement'. 
Ou seja, nosso evento de form do React irá receber um tipo genérico
de form HTML
*/
type FormElem = React.FormEvent<HTMLFormElement>

// crio uma interface, ou seja, uma espécie de tipo personalizado que eu crio

interface ITodo {
  text: string
  complete: boolean
}

// interface ITodo2 extends ITodo{
//   tags: string[]
// }

// conponente principal, o App(), é definido. Seu retorno será um JSX.Element, ou melhor, um Elemento JSX
// - que é a junção do javascript e o HTML.
function App(): JSX.Element {
  // defino as contantes como estados usando o useState(), o qual irá receber um tipo entre o maior que e menor que.
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  // Função que lidará com o submit do formulário.
  const handleSubmit = (e:FormElem): void=>{
    // Irá impedir que o form atualize e dê um refresh na página
    e.preventDefault()
    addTodo(value)
    setValue('')
  }
  // Função que adiciona novas tarefas ao To do List.
  const addTodo =(text: string): void =>{
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }

  const removeTodo = (index: number): void=>{
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
  }
  // Função que completa as tarefas do To do List.
  const completeTodo = (index: number) : void =>{
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }
  return (
    <>
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} placeholder="Add Todo" onChange={e => setValue(e.target.value)} required/>
          <button className= "button" type="submit">Add</button>
        </form>
        <section>
          {todos.map((todo: ITodo, index: number) => (
            <Fragment key={index}>
              <div className="todos-wrapper">
                <div>
                  <p style={{textDecoration: todo.complete? 'line-through': ''}}>{todo.text}</p>
                </div>
                <div className="botoes">
                  <button type="button" className="action" onClick={() => {
                    completeTodo(index)}}>{todo.complete? "incomplete":"complete"}</button>
                  <button type="button" className="action" onClick={() =>{
                    removeTodo(index)}}>delete</button>                   
                </div>
              </div>
            </Fragment>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
