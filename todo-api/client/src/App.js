import React, { useEffect, useState } from 'react';

import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import Header from './app/Header';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux'
import { checkLoginStatus } from './auth/authSlice'
import UserForm from './auth/UserForm'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

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
          <ThemeProvider theme={theme}>
          <React.Fragment>
            <Grid container direction='column' justify='space-between' spacing={0}>
              <Grid>
                <Header />
              </Grid>
              <Grid item container style={{marginTop: 10}}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <TodosList />
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </Grid>
          </React.Fragment>
          </ThemeProvider>
        )} />
      <Route
        exact
        path={"/"}
        render={props => (
          <React.Fragment>
            <ThemeProvider theme={theme}>
                <Grid container justify='center' wrap='nowrap'>
                  <Grid item>
                    <UserForm />
                  </Grid>
                </Grid>
            </ThemeProvider>
          </React.Fragment>
        )} />
      <AuthRedirect />
    </Router>
    
  );
}

export default App;
