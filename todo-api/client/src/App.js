import React, { useEffect, useState } from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import { AddTodoForm } from './TodoList/AddTodoForm'
import Header from './app/Header';
import { Grid } from '@material-ui/core';
import Home from './auth/Home';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { checkLoginStatus } from './auth/authSlice'
import UserForm from './auth/UserForm'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoginStatus());
  })

  return (
    <Router>
      <Route 
        path="/todolist" 
        exact 
        render={props => (
          <React.Fragment>
                {/* <Header /> */}
                <Grid container justify='center' wrap='nowrap'>
                  <Grid item wrap='nowrap'>
                    <AddTodoForm />
                    <TodosList />
                  </Grid>
                </Grid>
          </React.Fragment>
        )} />
      <Route
        exact
        path={"/"}
        render={props => (
          <UserForm />
        )} />
      <Route path="/completed" />
    </Router>
  );
}

export default App;
