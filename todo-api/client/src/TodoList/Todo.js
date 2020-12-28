import React from 'react';

const Todo = ({ todo, removeTodo, editTodo, editing, toggleComplete }) => (
    <div className="todo" key={todo.id}>
      <h4>{todo.title}</h4>
      <p>{todo.tag}</p>

      {editing || todo.done ? (null
      ) : (
          <button
              onClick={() => {editTodo(todo)}}
          >Edit</button>
      )}


      <button onClick={() => removeTodo(todo.id)}>Remove</button>
      <button onClick={() => toggleComplete(todo)}>
          {todo.done ? <>Undo Complete</> : <>Complete</> }
      </button>
    </div>
);

export default Todo;