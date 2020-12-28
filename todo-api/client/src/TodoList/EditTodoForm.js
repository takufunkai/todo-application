import React, { useState } from 'react';

const EditTodoForm = props => {
  const [todo, setTodo] = useState(props.currentTodo);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTodo({ ...todo, [name]: value })
  };

  return (
      <form onSubmit={event => {
        event.preventDefault();
        if (!todo.title) return;
        props.updateTodo(todo)
      }}>
        <label>Title</label>
        <input type="text" name="title" value={todo.title} onChange={handleInputChange} ></input>
        <label>Tag</label>
        <input type="text" name="tag" value={todo.tag} onChange={handleInputChange} ></input>

        <button>Update Todo</button>
        <button onClick={() => props.setEditing(false)}>Cancel</button>
      </form>
  )
};

export default EditTodoForm;