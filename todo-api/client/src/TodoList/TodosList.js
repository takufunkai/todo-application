import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Paper, TextField, ListItem, Collapse, ListItemText, List, Select, MenuItem, Grid, InputLabel } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { fetchTodos, loggedOut, selectAllTodos } from './todosSlice';
import { AddTodoForm } from './AddTodoForm'
import { CTodoList } from './_TodoList'

const TodosList = props => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [showTag, setShowTag] = useState('Inbox')

  const sortByDate = (d1, d2) => new Date(d1.due_date).getTime() - new Date(d2.due_date).getTime()
  const filterBySearch = todo => todo.title.toLowerCase().startsWith(search)

  const todosByTag = useSelector(selectAllTodos).filter(todo => showTag === 'Inbox' ? true : todo.tag === showTag ) //selecting todos, then filtering by tags
  const doneTodos = todosByTag.filter(todo => todo.done).filter(filterBySearch).sort(sortByDate).reverse()          //take out done todos, and sort them by date
  const undoneTodos = todosByTag.filter(todo => !todo.done).filter(filterBySearch).sort(sortByDate).reverse()       //take out undone todos, and sort them by date

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
    setSearch(e.target.value)
  }

  const handleTagChange = (event) => {
    setShowTag(event.target.value);
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
      : doneContent = <p>No completed todos to show.</p>

      undoneTodos.length > 0 
      ? undoneContent = undoneTodos.map(todo => (
        <CTodoList key={todo.id} todo={todo} />
    )) 
      : undoneContent = <p>No incomplete todos to show.</p>
  } else if (todoStatus === 'failed') {
    doneContent = <div>{error}</div>
    undoneContent = <div>{error}</div>
  }

  return (
    <div>
      <div className="todos-list">
        <Paper>
          <Grid container>
            <Grid item>
              <TextField
                placeholder='search'
                variant='outlined'
                onChange={handleSearchChange} 
                width='100%'/>
                <br/>
            </Grid>
            <Grid item>
            <InputLabel id="select-tag-to-display">Tags</InputLabel>
              <Select
                id="select-tag-to-display"
                value={showTag}
                onChange={handleTagChange}
                style={{margin: 10,
                  minWidth: 120,}}>
                {allTags.map(tag => (
                  <MenuItem value={tag}>{tag}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <AddTodoForm />
          {undoneContent}
          <Divider variant="middle" />
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Completed Todos" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {doneContent}
            </List>
          </Collapse>
        </Paper>
      </div>
    </div>
  )
};
export default TodosList;