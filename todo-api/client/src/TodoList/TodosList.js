import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Paper, TextField, ListItem, Collapse, ListItemText, List, Select, MenuItem, Grid, InputLabel } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { fetchTodos, loggedOut, toggleCurrentTag, selectCompleteTodos, selectIncompleteTodos, handleSearch } from './todosSlice';
import { AddTodoForm } from './AddTodoForm'
import { CTodoList } from './_TodoList'

const TodosList = props => {
  const dispatch = useDispatch()
  const doneTodos = useSelector(selectCompleteTodos) //note: these todos are sorted/filtered based on tags, search and sort preferences...
  const undoneTodos = useSelector(selectIncompleteTodos) //... within the todosSlice

  const allTags = useSelector(state => state.todos.allTags)
  const currentUserId = useSelector(state => state.auth.user.id)
  const todoStatus = useSelector(state => state.todos.status)      //load status of todos
  const error = useSelector(state => state.todos.error)
  const [fetch, setFetch] = useState(false)
  const [open, setOpen] = useState(true);                          //open completed list

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearchChange = e => {
    dispatch(handleSearch(e.target.value.toLowerCase()))
  }

  const handleTagChange = (event) => {
    dispatch(toggleCurrentTag(event.target.value))
  };

  useEffect(() => {
    setFetch(true)
    if (currentUserId > -1 && fetch) {
      dispatch(fetchTodos(currentUserId))
    }
    return () => { 
      dispatch(loggedOut()) 
      setFetch(false)
    }
  }, [dispatch, fetch, currentUserId])

  let doneContent
  let undoneContent

  if (todoStatus === 'loading') {
    doneContent = <div className="loader">Loading...</div>
    undoneContent = <div className="loader">Loading...</div>
  } else if (todoStatus === 'succeeded') {
    doneTodos.length > 0 
      ? doneContent = doneTodos.map(todo => (
        <CTodoList key={todo.id} todo={todo} />
    )) 
      : doneContent = (
        <Grid container spacing={2}>
          <Grid item />
          <Grid item>
            <p>No tasks to show. Why not start something?</p>
          </Grid>
        </Grid>
      )

      undoneTodos.length > 0 
      ? undoneContent = undoneTodos.map(todo => (
        <CTodoList key={todo.id} todo={todo} />
    )) 
      : undoneContent = (
        <Grid container spacing={2}>
          <Grid item />
          <Grid item>
            <p>No tasks to show. Why not take a break?</p>
          </Grid>
        </Grid>
      )
  } else if (todoStatus === 'failed') {
    doneContent = <div>{error}</div>
    undoneContent = <div>{error}</div>
  }

  return (
    <div>
      <Grid container direction='column'>
        <Grid item container>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <TextField
              fullWidth
              placeholder='Search tasks'
              variant='outlined'
              onChange={handleSearchChange} 
              size='100%'/>
            <br/>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <InputLabel id="select-tag-to-display">Show by Tags</InputLabel>
            <Select
              id="select-tag-to-display"
              defaultValue='Inbox'
              onChange={handleTagChange}
              style={{margin: 10,
                minWidth: 120,}}>
              {allTags.map(tag => (
                <MenuItem value={tag}>{tag}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Paper>
          <Grid container direction='column'>
            <ListItem>
              <AddTodoForm />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tasks" secondary={<>{undoneTodos.length} remaining</>}/>
            </ListItem>
            {undoneContent}
            <Divider variant="middle" />
            <ListItem button onClick={handleClick}>
              <ListItemText primary="Completed Tasks" secondary={<>{doneTodos.length} completed</>}/>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {doneContent}
              </List>
            </Collapse>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
};
export default TodosList;