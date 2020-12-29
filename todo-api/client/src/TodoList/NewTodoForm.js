import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const NewTodoForm = props => {
  const [todo, setTodo] = useState(props.initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTodo({ ...todo, [name]: value })
  };

  const handleSubmit = event => {
    console.log('Handling...' + JSON.stringify(todo))
    if (!todo.title) return;
    props.addTodo(todo)
    setTodo(props.initialFormState)
  }

  return (
      <Grid container spacing={4}>
        <Grid item>
            <TextField 
                placeholder="title" 
                type="text" 
                name="title" 
                value={todo.title} 
                onChange={handleInputChange}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        handleSubmit();
                    }
                }} />
        </Grid>
        <Grid item> 
            <TextField 
                placeholder="tag"
                type="text" 
                name="tag" 
                value={todo.tag} 
                onChange={handleInputChange}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        handleSubmit();
                    }
                }} />
        </Grid>
        <Button type="submit" color="primary" onClick={handleSubmit}>
            <AddCircleOutlineIcon height={2}/>
        </Button>
      </Grid>
  )
};

export default NewTodoForm;