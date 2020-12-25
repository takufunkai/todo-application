import React from 'react';

const Todo = ({ todo, removeTodo, editTodo, editing }) => (
    <div className="todo" key={todo.id}>
      <h4>{todo.title}</h4>
      <p>{todo.tag}</p>

      {editing ? (null
      ) : (
          <button
            onClick={() => {editTodo(todo)}}
          >Edit</button>
      )}
      
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
    </div>
);

export default Todo;