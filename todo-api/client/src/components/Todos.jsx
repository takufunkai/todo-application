import React from 'react';
import API from '../API';
import Todo from './Todo';

const Todos = () => {

    const { todos, removeTodo, editTodo, editing, completeTodo } = API();

    


    const CompletedTodos = () => {
        console.log('change');
        return (todos && todos.filter(todo => todo.done === true).map((todo, _) => (
            <Todo 
            key={todo.id} 
            todo={todo} 
            removeTodo={removeTodo} 
            editTodo={editTodo} 
            editing={editing} 
            completeTodo={completeTodo} 
            />
        )))
    }

    const PendingTodos = () => {
        return (todos && todos.filter(todo => todo.done === false).map((todo, _) => (
            <Todo 
            key={todo.id} 
            todo={todo} 
            removeTodo={removeTodo} 
            editTodo={editTodo} 
            editing={editing} 
            completeTodo={completeTodo} 
            />
        )))
    }

    return { CompletedTodos, PendingTodos }; 
    
}

export default Todos;