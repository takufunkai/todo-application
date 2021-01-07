import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Paper, Typography } from '@material-ui/core';
import { selectTodoById, fetchTodos, selectCompleteTodos, selectIncompleteTodos } from './todosSlice';
import { DeleteTodoButton } from './DeleteTodo'
import { EditTodoForm } from './EditTodoForm'
import { ToggleCompleteButton } from './ToggleCompleteButton';

let TodoItem = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId))

  return (
    <article className="todo-item" >
      <Typography variant='h4' >{todo.title}</Typography>
      <p>{todo.tag}</p>
      <DeleteTodoButton id={todoId} />
      {todo.done ? null : <EditTodoForm todo={todo} />}
      <ToggleCompleteButton todo={todo} />
    </article>
  )
}

const TodosList = props => {
  const dispatch = useDispatch()
  const doneTodos = useSelector(selectCompleteTodos)
  const undoneTodos = useSelector(selectIncompleteTodos)

  const todoStatus = useSelector(state => state.todos.status)
  const error = useSelector(state => state.todos.error)

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])

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