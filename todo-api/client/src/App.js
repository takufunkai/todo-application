import React from 'react';
<<<<<<< HEAD
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import TodosList from './TodoList/TodosList';
import Header from './UI/Header';
import CompletedList from './TodoList/CompletedList';
=======
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import { AddTodoForm } from './TodoList/AddTodoForm'
import Header from './app/Header';
>>>>>>> redux
import { Grid } from '@material-ui/core';

function App() {

  return (
    <Router>
<<<<<<< HEAD
      <Grid>
          <Header />
      </Grid>
      <Grid container justify="center">
        <Switch>
          <Route path="/" exact component={TodosList} />
          <Route path="/completed" component={CompletedList} />
          <Redirect to="/" />
        </Switch>
      </Grid>
=======
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
>>>>>>> redux
    </Router>
  );
}

export default App;
