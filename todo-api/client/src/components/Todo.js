import React from 'react';
import { Button } from '@material-ui/core';

const Todo = ({ 
  todo, removeTodo, editTodo, editing, completeTodo 
  }) => (
    <div className="todo" >
      <h4>{todo.title}</h4>
      <p>{todo.tag}</p>

      {editing || todo.done ? (null
      ) : (
          <Button
            onClick={() => {editTodo(todo)}}
          >Edit</Button>
      )}
      
      <Button onClick={() => removeTodo(todo.id)}>Delete</Button>

     {todo.done ? (
        <Button 
          onClick={() => completeTodo(todo)}
        >Undo complete</Button>
     ) : (
        <Button 
          onClick={() => completeTodo(todo)}
        >Complete</Button>
     )}
     <hr width="10%"/>
    </div>
);

export default Todo;