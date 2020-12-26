import React from 'react';

const Todo = ({ 
  todo, removeTodo, editTodo, editing, completeTodo 
  }) => (
    <div className="todo" style={{ textDecoration: todo.done ? "line-through" : "" }} >
      <h4>{todo.title}</h4>
      <p>{todo.tag}</p>

      {editing ? (null
      ) : (
          <button
            onClick={() => {editTodo(todo)}}
          >Edit</button>
      )}
      
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
      <button onClick={() => completeTodo(todo)}>Complete</button>
    </div>
);

export default Todo;