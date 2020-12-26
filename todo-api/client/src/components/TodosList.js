import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';

const TodosList = props => {

  const apiUrl = '/api/v1/todos';

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(apiUrl)
        .then(res => setTodos(res.data))
      }, [todos]);

  const initialFormState = {
    title:'',
    tag:''
    };

  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(initialFormState);

  const addTodo = todo => {
      const qs = require('qs');

      axios.post(apiUrl, qs.stringify(
          {
              todo:{
                  title: todo.title,
                  tag: todo.tag}
        }))
        .then(res=>(console.log(res.id)))
        .catch( error => console.log(error))

    setTodos([...todos, todo]);
  }

  const removeTodo = id => {
    axios.delete( '/api/v1/todos/' + id )
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
  
  const updateTodo = (updatedTodo) => {
    setEditing(false);

    const qs = require('qs');
    axios.patch('api/v1/todos/' + updatedTodo.id, qs.stringify(
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
            <NewTodoForm addTodo={addTodo} initialFormState={initialFormState} />
          )}
        </div>
        <br/>
        <hr/>
        {todos.map((todo, _) => (
            <Todo key={todo.created_at} todo={todo} removeTodo={removeTodo} editTodo={editTodo} editing={editing} />
        ))}
      </div>
    </div>
  )
};
export default TodosList;