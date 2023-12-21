import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import TodoList from "./components/TodoList";

function App() {

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/todos')
      .then(res => res.json())
      .then(data => {
        setTodos(Object.values(data));
        setIsLoading(false)
        console.log(data);
      })
  }, []);

  const onTodoAdd = () => {
    const text = prompt('Add new task');
    setTodos(state => [{ _id: Math.random(), text, isCompleted: false }, ...state]);
  }

  const toggleTodoStatus = (id) => {
    setTodos(state => state.map(todo => todo._id === id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo));
  }

  return (

    <div>

      <Header />

      <main className="main">

        <section className="todo-list-container">
          <h1>Todo List</h1>

          <div className="add-btn-container">
            <button className="btn" onClick={onTodoAdd}>+ Add new Todo</button>
          </div>

          <div className="table-wrapper">

            {isLoading
              ? <Loading />
              : <TodoList todos={todos} toggleTodoStatus={toggleTodoStatus} />
            }

          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}

export default App;
