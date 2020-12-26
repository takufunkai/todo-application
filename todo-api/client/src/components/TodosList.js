import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';


const TodosList = props => {

  const apiUrl = '/api/v1/todos/';

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchTodo = async () => {
      const res = await axios.get(apiUrl);
      if (!ignore) setTodos(res.data);
    };
    fetchTodo();
    return (() => {ignore = true; });
  }, [todos]);

  const initialFormState = {
    title:'',
    tag:''
    };

  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(initialFormState);
  const completedTodos = todos.filter(todo => todo.done === true)
  const pendingTodos = todos.filter(todo => todo.done === false)

  const addTodo = todo => {
      const qs = require('qs');

      axios.post(apiUrl, qs.stringify(
          {
              todo:{
                  title: todo.title,
                  tag: todo.tag,
                  done: false}
        }))
        .then(res=>(console.log(res.id)))
        .catch( error => console.log(error))

      setTodos([...todos, todo]);
  }

  const removeTodo = id => {
    axios.delete( apiUrl + id )
        .then(response => {
          setTodos(todos.filter(todo => todo.id !== id))
        })
        .catch(error => console.log(error))

  };

  const editTodo = todo => {
    setEditing(true);
    setCurrentTodo({
      id: todo.id,
      title: todo.title,
      tag: todo.tag,
      done: todo.done
    })
  }

  const completeTodo = completedTodo => {
    const qs = require('qs');
    axios.patch(apiUrl + completedTodo.id, qs.stringify(
      {
        todo: {
          done: !completedTodo.done
        }
      }
    ))
      .then(res => console.log(res.data));

    setTodos(todos.map(todo => (todo.id === completedTodo.id ? completedTodo : todo)))

  };
  
  const updateTodo = updatedTodo => {
    setEditing(false);

    const qs = require('qs');
    axios.patch(apiUrl + updatedTodo.id, qs.stringify(
      {
        todo: {
          title: updatedTodo.title,
          tag: updatedTodo.tag,
          done: updatedTodo.done
        }
      }
    ))
      .then(res => console.log(res.data));

    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  };

  return (
    <div>
      <div className="todos-list">
        <div>
          {editing ? (
            <EditTodoForm
              setEditing={setEditing}
              currentTodo={currentTodo}
              updateTodo={updateTodo}
            />
          ) : (
            <NewTodoForm 
              addTodo={addTodo} 
              initialFormState={initialFormState} 
            />
          )}
        </div>
        <br/>
        <hr/>
        <h1>Tasks</h1>
        {pendingTodos.map((todo, _) => (
            <Todo 
              key={todo.id} 
              todo={todo} 
              removeTodo={removeTodo} 
              editTodo={editTodo} 
              editing={editing} 
              completeTodo={completeTodo} 
              />
        ))}
        <hr />
        <hr />
        <h1>Completed</h1>
        {completedTodos.map((todo, _) => (
            <Todo 
              key={todo.id} 
              todo={todo} 
              removeTodo={removeTodo} 
              editTodo={editTodo} 
              editing={editing} 
              completeTodo={completeTodo} 
              />
        ))}
      </div>
    </div>
  )
};
export default TodosList;