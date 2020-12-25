import React, { useState } from 'react';

const NewTodoForm = props => {
  const [todo, setTodo] = useState(props.initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTodo({ ...todo, [name]: value })
  };

  return (
      <form onSubmit={event => {
        event.preventDefault()
        if (!todo.title | !todo.tag) return; //depends if we need to prev default tag
        props.addTodo(todo)
        setTodo(props.initialFormState)
      }}>
        <label>Title</label>
        <input type="text" name="title" value={todo.title} onChange={handleInputChange} ></input>
        <label>Tag</label>
        <input type="text" name="tag" value={todo.tag} onChange={handleInputChange} ></input>
        <button>Create Todo</button>
      </form>
  )
};

export default NewTodoForm;