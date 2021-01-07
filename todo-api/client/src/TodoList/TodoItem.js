import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodoById } from './todosSlice'
import { DeleteTodoButton } from './DeleteTodo'
import { EditTodoForm } from './EditTodoForm'
import { ToggleCompleteButton } from './ToggleCompleteButton';
import { Typography, Card, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  card: {
    width: 400,
    margin: 40,
  },
}));

export const TodoItem = ({ todoId }) => {
  const classes = useStyles()
  const todo = useSelector((state) => selectTodoById(state, todoId))

  //displays for task which are not done
  let EditForm
  if (!todo.done) { EditForm = <EditTodoForm todo={todo}/> }

  return (
    <Card>
      <Grid container className={classes.card} spacing={0}>
        <Grid item>
          <ToggleCompleteButton todo={todo} />
        </Grid>
        <Grid item xs>
          <Typography variant='h4' >{todo.title}</Typography>
        </Grid>
        <Grid item>
          <p>Tag: {todo.tag}</p>
        </Grid>
        <Grid item>
          <DeleteTodoButton id={todoId} />
        </Grid>
        <Grid item>
          {EditForm}
        </Grid>
      </Grid>
    </Card>
  )
}