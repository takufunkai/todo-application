import React, { useEffect, useState } from 'react';

import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import { AddTodoForm } from './TodoList/AddTodoForm'
import Header from './app/Header';
import { Grid } from '@material-ui/core';
import Home from './app/Home';
import axios from 'axios';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN')
  const [user, setUser] = useState({})

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true }).then(response => {
      console.log("logged in? ", response)
    }).catch(error => {
      console.log("check login error", error)
    })
  }

  useEffect(() => {
    checkLoginStatus();
    return () => {
    }
  }, [loggedInStatus])

  function handleLogin(data) {
    checkLoginStatus()
    setLoggedInStatus('LOGGED_IN')
    setUser(data.user)
  }

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
                    <TodosList {...props} loggedInStatus={loggedInStatus}/>
                  </Grid>
                </Grid>
          </React.Fragment>
        )} />
      <Route 
        exact 
        path={"/"}
        render={props => (
          <Home {...props} handleLogin={handleLogin} loggedInStatus={loggedInStatus} />
        )} />
      <Route path="/completed" />
    </Router>
  );
}

export default App;
