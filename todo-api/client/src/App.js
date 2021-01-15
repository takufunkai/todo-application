import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import TodosList from './TodoList/TodosList';
import Header from './app/Header';
import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux'
import { checkLoginStatus } from './auth/authSlice'
import UserForm from './auth/UserForm'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { lightTheme, darkTheme } from './theme'

function App() {
  const darkMode = useSelector(state => state.todos.darkMode)
  const dispatch = useDispatch()
  const loggedInStatus = useSelector(state => state.auth.loggedInStatus)

  const currentTheme = createMuiTheme(darkMode ? darkTheme : lightTheme)

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
          <ThemeProvider theme={currentTheme}>
          <React.Fragment>
            <div>
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
            </div>
          </React.Fragment>
          </ThemeProvider>
        )} />
      <Route
        exact
        path={"/"}
        render={props => (
          <React.Fragment>
            <ThemeProvider theme={currentTheme}>
              <div style={{ position: 'absolute', top:0, right: 0, bottom:0, left:0,
                backgroundImage: `url("https://i.imgur.com/WlSB08o.jpg")`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat' }}>
                <UserForm />
              </div>
            </ThemeProvider>
          </React.Fragment>
        )} />
      <AuthRedirect />
    </Router>
    
  );
}

export default App;
