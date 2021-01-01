import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import TodosList from './TodoList/TodosList';
import Header from './UI/Header';
import CompletedList from './TodoList/CompletedList';
import { Grid } from '@material-ui/core';

function App() {

  return (
    <Router>
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
    </Router>
  );
}

export default App;
