import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';

const CompletedList = () => {
    const [todos, setTodos] = useState([]);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/todos.json')
            .then(res => setTodos(res.data))
          }, [JSON.stringify(todos), complete]);

    const toggleComplete = completedTodo => {
        const qs = require('qs');
        axios.patch('/api/v1/todos/' + completedTodo.id, qs.stringify(
            {
            todo: {
                done: !completedTodo.done
            }
            }
        ))
            .then(res => console.log(res.data))
        setTodos(todos.map(todo => 
            (todo.id === completedTodo.id ? completedTodo : todo)));
        setComplete(!complete);
    };
    const removeTodo = id => {
        axios.delete( '/api/v1/todos/' + id )
            .then(response => {
              setTodos(todos.filter(todo => todo.id !== id))
            })
            .catch(error => console.log(error))
    };


    return <div> <h1>Completed</h1>
    {todos.filter(todo => todo.done).map((todo, _) => (
        <Todo key={todo.id} todo={todo} removeTodo={removeTodo} toggleComplete={toggleComplete}/>
    ))}
    </div>
}

export default CompletedList;