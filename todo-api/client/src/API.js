import React, { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios';

const API = () => {
  const apiUrl = '/api/v1/todos/';
  const initialFormState = {
    title:'',
    tag:''
    };
    
  const [todos, setTodos] = useState([])
  const [editing, setEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(initialFormState)
  const [change, setChange] = useState(false);
  // const [searchTodo, setSearchTodo] = useState('')

  // // useEffect(() => {
  // // }, [todos]);

  // const fetchTodo = async () => {
  //   let ignore = false;
  //   if (!ignore) {const res = await axios.get(apiUrl);
  //   setTodos(res.data);}
  //   return(ignore = true);
  // };

    const fetchData = useCallback(() => {
      axios.get('/api/v1/todos.json')
      .then(res => setTodos(res.data))
      .catch((error) => {
        console.log(error)
      })
    }, []);
  
    useEffect(() => {
      fetchData()
      }, [JSON.stringify(todos)]);


  const addTodo = todo => {
      const qs = require('qs');

      axios.post(apiUrl, qs.stringify(
          {
              todo:{
                  id: todos.length + 1,
                  title: todo.title,
                  tag: todo.tag,
                  done: false}
        }))
        .then(res=>(console.log(res.id)))
        .catch( error => console.log(error))

      console.log(todos);
      setTodos([...todos, todo]);
  }

  const removeTodo = id => {
    axios.delete( apiUrl + id )
        .then(response => {
          setTodos(todos.filter(todo => todo.id !== id))
        })
        .catch(error => console.log(error))

  };

  const editTodo = todo => {
    setEditing(true);
    setCurrentTodo({
      id: todo.id,
      title: todo.title,
      tag: todo.tag,
      done: todo.done
    })
  }

  const completeTodo = completedTodo => {
    const qs = require('qs');
    axios.patch(apiUrl + completedTodo.id, qs.stringify(
      {
        todo: {
          done: !completedTodo.done
        }
      }
    ))
      .then(res => console.log(res.data));

    setTodos(todos.map(todo => (todo.id === completedTodo.id ? completedTodo : todo)))

  };
  
  const updateTodo = updatedTodo => {
    setEditing(false);

    const qs = require('qs');
    axios.patch(apiUrl + updatedTodo.id, qs.stringify(
      {
        todo: {
          title: updatedTodo.title,
          tag: updatedTodo.tag,
          done: updatedTodo.done
        }
      }
    ))
      .then(res => console.log(res.data));

    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  };

  return { editing, setEditing, currentTodo, updateTodo, addTodo, initialFormState, todos, removeTodo, editTodo, completeTodo };
}

export default API;