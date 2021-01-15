import React from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Grid } from '@material-ui/core';
import { ToggleCompleteButton } from './ToggleCompleteButton'
import { DeleteTodoButton } from './DeleteTodo' 
import { EditTodoForm } from './EditTodoForm'
import { TogglePriorityButton } from './TogglePriorityButton'


export const CTodoList = ({ todo }) => {
  return (
    <List dense={true}>
        <ListItem>
          <ListItemAvatar>
            <ToggleCompleteButton todo={todo} />
          </ListItemAvatar>
          <ListItemText
            primary={<p style={todo.done ?{textDecorationLine: 'line-through', textDecorationStyle: 'solid'} : {}}>{todo.title}</p>}
            secondary={<>Tag: {todo.tag ? todo.tag : '-'} | Deadline: {todo.due_date}</>}
          />
          <ListItemSecondaryAction >
            <Grid container alignItems='center'>
              <Grid item>
                <DeleteTodoButton id={todo.id} />
              </Grid>
                {!todo.done ? <EditTodoForm todo={todo} />: null}
              <Grid item>
              </Grid>
              <Grid item>
                <TogglePriorityButton todo={todo}/>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
    </List>
  )
}
