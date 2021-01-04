import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import { Divider, Paper, Grid, FormControl, 
  InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

const TodosList = props => {
  const todos = useSelector(state => state.todos)

  const renderedTodos = todos.map(todo => (
    <article key={todo.id}>
      <h3>{todo.title}</h3>
      <p>{todo.tag}</p>
    </article>
  ))


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
    // <div>
    //   <div className="todos-list">
    //     <div>
    //       <Grid container justify="center" alignItems="center">
    //         <FormControl spacing={2} maxWidth>
    //           <InputLabel>Search by...</InputLabel>
    //           <Select
    //             value={searchType}
    //             onChange={handleTypeChange}
    //             >
    //             <MenuItem value="title">Task Name</MenuItem>
    //             <MenuItem value="tag">Tag</MenuItem>
    //           </Select>
    //           <TextField 
    //             variant="outlined" 
    //             placeholder="Search..."
    //             value={search}
    //             onChange={e => setSearch(e.target.value)}
    //             />
    //         </FormControl>
    //       </Grid>
    //     </div>
    //     <div>
    //       <NewTodoForm addTodo={addTodo} initialFormState={initialFormState}/>
    //     </div>
    //     <br/>
    //     <hr/>
    //     <Paper>
    //       <h1>Tasks</h1>
    //       <Divider variant="middle" />
    //       {renderedTodos}
    //     </Paper>
    //   </div>
    // </div>
    <div>
      <h1>Tasks</h1>
      <Divider variant="middle" />
      {renderedTodos}
    </div>
)
};
export default TodosList;