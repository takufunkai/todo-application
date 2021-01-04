import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import { Divider, Paper, Grid, FormControl, 
  InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import { selectAllTodos, selectTodoById, fetchTodos } from './todosSlice';

let TodoItem = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId))

  return (
    <article className="todo-item" key={todo.id}>
      <h3>{todo.title}</h3>
      <p>{todo.tag}</p>
    </article>
  )
}

const TodosList = props => {
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)

  const todoStatus = useSelector(state => state.todos.status)
  const error = useSelector(state => state.todos.error)

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])

  let content

  if (todoStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (todoStatus === 'succeeded') {
    content = todos.map(todo => (
      <TodoItem key={todo.id} todoId={todo.id} />
    ))
  } else if (todoStatus === 'failed') {
    content = <div>{error}</div>
  }


  //<-- REDUX FUNCTIONS END HERE --> 

  // const initialFormState = {
  //   title:'',
  //   tag:'',
  // };

  // const [todos, setTodos] = useState([]);
  // const [complete, setComplete] = useState(false);

  // const [search, setSearch] = useState('');
  // const [searchType, setSearchType] = useState('title')

  // function getTodos() {
  //   return dispatch => {
  //     axios.get('/api/v1/todos/')
  //     .then(res =>
  //       dispatch({
  //         type: "FETCH_DATA",
  //         data: res.data
  //       })
  //     )
  //   }
  // }

  // useEffect(() => {
  //   dispatch(getTodos());
  // }, []);

  // const handleTypeChange = (event) => {
  //   setSearchType(event.target.value);
  // }


  // const addTodo = todo => {
  //   const qs = require('qs');
  //   axios.post('/api/v1/todos/', qs.stringify(
  //       {
  //         todo:{
  //           title: todo.title,
  //           tag: todo.tag,
  //           todo: false}
  //       }))
  //       .then(res=>( console.log(res)))
  //       .catch( error => console.log(error))
    
  //   setTodos([...todos, todo]);
  // };
  
  // const updateTodo = (updatedTodo) => {
  //   const qs = require('qs');
  //   axios.patch('/api/v1/todos/' + updatedTodo.id, qs.stringify(
  //       {
  //         todo:{
  //           title: updatedTodo.title,
  //           tag: updatedTodo.tag}
  //       }))
  //       .then(
  //           res=>(
  //               console.log(res.data)
  //           ));
  
  //   setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  // };

  // const toggleComplete = completedTodo => {
  //   const qs = require('qs');
  //   axios.patch('/api/v1/todos/' + completedTodo.id, qs.stringify(
  //     {
  //       todo: {
  //         done: !completedTodo.done
  //       }
  //     }
  //   ))
  //     .then(res => console.log(res.data))
  //   setTodos(todos.map(todo => 
  //     (todo.id === completedTodo.id ? completedTodo : todo)));
  //   setComplete(!complete);
  // };

  // const removeTodo = id => {
  //   axios.delete( '/api/v1/todos/' + id )
  //       .then(response => {
  //         setTodos(todos.filter(todo => todo.id !== id))
  //       })
  //       .catch(error => console.log(error))
  // };

  return (
    <div>
      <div className="todos-list">
        <div>
          <Grid container justify="center" alignItems="center">
          </Grid>
        </div>
        <hr/>
        <Paper>
          <h1>Tasks</h1>
          <Divider variant="middle" />
          {content}
        </Paper>
      </div>
    </div>
  )
};
export default TodosList;