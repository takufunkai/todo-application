import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import { AddTodoForm } from './TodoList/AddTodoForm'
import Header from './UI/Header';
import CompletedList from './TodoList/CompletedList';
import { Grid } from '@material-ui/core';

function App() {

  return (
    <Router>
      <Route 
        path="/" 
        exact 
        render={() => (
          <React.Fragment>
            <AddTodoForm />
            <TodosList />
          </React.Fragment>
        )} />
      <Route path="/completed" component={CompletedList} />
      <Redirect to='/' />
    </Router>
  );
}

export default App;
