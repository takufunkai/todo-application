import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Paper } from '@material-ui/core';
import { fetchTodos, selectCompleteTodos, selectIncompleteTodos, loggedOut } from './todosSlice';
import { TodoItem } from './TodoItem'
import { logoutUser } from '../auth/authSlice'

const TodosList = props => {
  const dispatch = useDispatch()
  const doneTodos = useSelector(selectCompleteTodos)
  const undoneTodos = useSelector(selectIncompleteTodos)
  const currentUserId = useSelector(state => state.auth.user.id)
  const todoStatus = useSelector(state => state.todos.status)
  const error = useSelector(state => state.todos.error)
  const [fetch, setFetch] = useState(false)


  const onLogoutClicked = async () => {
    try {
      await dispatch(logoutUser())
    } catch (err) {
      console.error('Failed to save the todo: ', err)
    }
    console.log('clicked logout for:', currentUserId)
  }

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
  } else if (todoStatus === 'succeeded') {
    doneTodos.length > 0 
      ? doneContent = doneTodos.map(todo => (
      <TodoItem key={todo.id} todoId={todo.id} />
    )) 
      : doneContent = <h2>You did nothing</h2>
  } else if (todoStatus === 'failed') {
    doneContent = <div>{error}</div>
  }

  if (todoStatus === 'loading') {
    undoneContent = <div className="loader">Loading...</div>
  } else if (todoStatus === 'succeeded') {
    undoneTodos.length > 0 
      ? undoneContent = undoneTodos.map(todo => (
      <TodoItem key={todo.id} todoId={todo.id} />
    )) 
      : undoneContent = <h2>You're done!</h2>
  } else if (todoStatus === 'failed') {
    undoneContent = <div>{error}</div>
  }

  return (
    <div>
      <div className="todos-list">
        <hr/>
        <Paper>
          <h1>Task List</h1>
          <button onClick={onLogoutClicked}>Logout</button>
          <h1>Status: {currentUserId}</h1>
          <Divider variant="middle" />
          {undoneContent}
          <Divider variant="middle" />
          {doneContent}
        </Paper>
      </div>
    </div>
  )
};
export default TodosList;