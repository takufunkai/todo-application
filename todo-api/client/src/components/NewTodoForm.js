import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import API from '../API';

const NewTodoForm = () => {
  const { addTodo, initialFormState } = API();
  const [todo, setTodo] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTodo({ ...todo, [name]: value })
  };

  const handleSubmit = event => {
        if (!todo.title) return;
        addTodo(todo)
        setTodo(initialFormState)
  }

  return (
      <form> 
        <TextField 
          id="outlined-basic" 
          label="Title" 
          variant="outlined" 
          type="text" 
          name="title" 
          value={todo.title} 
          onChange={handleInputChange} />
        <TextField 
          id="outlined-basic" 
          label="Tag" 
          variant="outlined"
          type="text" 
          name="tag" 
          value={todo.tag} 
          onChange={handleInputChange} />
        <IconButton onClick={() => handleSubmit()}>
          <PublishIcon />
        </IconButton>
      </form>
  )
};

export default NewTodoForm;