import React, { useEffect, useState } from 'react';

import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import { AddTodoForm } from './TodoList/AddTodoForm'
import Header from './app/Header';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux'
import { checkLoginStatus } from './auth/authSlice'
import UserForm from './auth/UserForm'

function App() {
  const dispatch = useDispatch()
  const loggedInStatus = useSelector(state => state.auth.loggedInStatus)

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch])

  const AuthRedirect = () => {
    if (loggedInStatus === 'NOT_LOGGED_IN') {
      return <Redirect to='/' />
    } else {
      return <Redirect to='/todolist' />
    }
  }

  return (
    <Router>
      <Route 
        path="/todolist" 
        exact 
        render={props => (
          <React.Fragment>
            <Grid container direction='column' justify='flex-end' spacing={4}>
              <Grid item>
                <Header />
              </Grid>
              <Grid item container>
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <TodosList />
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </Grid>
          </React.Fragment>
        )} />
      <Route
        exact
        path={"/"}
        render={props => (
          <React.Fragment>
                {/* <Header /> */}
                <Grid container justify='center' wrap='nowrap'>
                  <Grid item>
                    <UserForm />
                  </Grid>
                </Grid>
          </React.Fragment>
        )} />
      <AuthRedirect />
    </Router>
    
  );
}

export default App;
