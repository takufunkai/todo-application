import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';

const TodosList = props => {

  const initialFormState = {
    title:'',
    tag:'',
  };

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(initialFormState);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    axios.get('/api/v1/todos.json')
        .then(res => setTodos(res.data))
      }, [JSON.stringify(todos), complete]);


  const addTodo = todo => {
    const qs = require('qs');
  
    axios.post('/api/v1/todos/', qs.stringify(
        {
          todo:{
            title: todo.title,
            tag: todo.tag,
            todo: false}
        }))
        .then(res=>( console.log(res)))
        .catch( error => console.log(error))
    
    setTodos([...todos, todo]);
  };

  const editTodo = todo => {
    setEditing(true);
    setCurrentTodo({
      id: todo.id,
      title: todo.title,
      tag: todo.tag,
      done: todo.done
    })
  };
  
  const updateTodo = (updatedTodo) => {
    setEditing(false);
  
    const qs = require('qs');
    axios.patch('/api/v1/todos/' + updatedTodo.id, qs.stringify(
        {
          todo:{
            title: updatedTodo.title,
            tag: updatedTodo.tag}
        }))
        .then(
            res=>(
                console.log(res.data)
            ));
  
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  };

  const toggleComplete = completedTodo => {
    const qs = require('qs');
    axios.patch('/api/v1/todos/' + completedTodo.id, qs.stringify(
      {
        todo: {
          done: !completedTodo.done
        }
      }
    ))
      .then(res => console.log(res.data))
    setTodos(todos.map(todo => 
      (todo.id === completedTodo.id ? completedTodo : todo)));
    setComplete(!complete);
  };

  const removeTodo = id => {
    axios.delete( '/api/v1/todos/' + id )
        .then(response => {
          setTodos(todos.filter(todo => todo.id !== id))
        })
        .catch(error => console.log(error))
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
            <NewTodoForm addTodo={addTodo} initialFormState={initialFormState}/>
          )}
        </div>
        <br/>
        <hr/>
        <h1>Tasks</h1>
        {todos.filter(todo => !todo.done).map((todo, _) => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} editTodo={editTodo} editing={editing} toggleComplete={toggleComplete}/>
          ))}
      </div>
    </div>
)
};
export default TodosList;