import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import { AddTodoForm } from './TodoList/AddTodoForm'
import Header from './app/Header';
import { Grid } from '@material-ui/core';

function App() {

  return (
    <Router>
      <Route 
        path="/" 
        exact 
        render={() => (
          <React.Fragment>
                <Header />
                <Grid container justify='center'>
                  <Grid item>
                    <AddTodoForm />
                    <TodosList />
                  </Grid>
                </Grid>
          </React.Fragment>
        )} />
      <Route path="/completed" />
      <Redirect to='/' />
    </Router>
  );
}

export default App;
