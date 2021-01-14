import React from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import { ToggleCompleteButton } from './ToggleCompleteButton'
import { DeleteTodoButton } from './DeleteTodo' 
import { EditTodoForm } from './EditTodoForm'


export const CTodoList = ({ todo }) => {
  return (
    <List dense={false}>
        <ListItem>
          <ListItemAvatar>
            <ToggleCompleteButton todo={todo} />
          </ListItemAvatar>
          <ListItemText
            primary={todo.title}
            secondary={<>Tag: {todo.tag ? todo.tag : '-'} | Deadline: {todo.due_date}</>}
          />
          <ListItemSecondaryAction >
            <DeleteTodoButton id={todo.id} />
            {!todo.done ? <EditTodoForm todo={todo} />: null}
          </ListItemSecondaryAction>
        </ListItem>
    </List>
  )
}
