import React from 'react';
import EditTodoForm from './EditTodoForm';
import { Card, Button, Grid, Typography, Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Todo = ({ 
    todo, removeTodo, toggleComplete, updateTodo
  }) => (
    <Grid container direction="row">
        <Grid container direction="row" alignItems="center">
            <Grid item>
               <Checkbox checked={todo.done} onChange={() => toggleComplete(todo)}/>
            </Grid>
            <Grid item xs>
                <Typography variant="h5">{todo.title}</Typography>
                {todo.tag}
            </Grid>
        </Grid>

        <Grid container justify="flex-end">
            {todo.done ? (null
            ) : (
                <EditTodoForm key={todo.id} updateTodo={updateTodo} todo={todo} /> 
                )}
            <Button color="primary" onClick={() => removeTodo(todo.id)}>
                <DeleteIcon />
            </Button>
        </Grid>
    </Grid>
);

export default Todo;