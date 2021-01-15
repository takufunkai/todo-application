import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../auth/authSlice'
import { Toolbar, Typography, CssBaseline, AppBar, Button, Grid, Switch, FormControlLabel } from '@material-ui/core'
import { switchedDarkMode } from '../TodoList/todosSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.todos.darkMode)
  const currentUser = useSelector(state => state.auth.user.email)

  const onLogoutClicked = async () => {
    try {
      await dispatch(logoutUser())
    } catch (err) {
      console.error('Failed to save the todo: ', err)
    }
  }

  const onThemeToggle = () => {
    dispatch(switchedDarkMode())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={4}>
              <Typography variant="h4" noWrap>
                Yet another to-do list
              </Typography>
            </Grid>
            <Grid container alignItems='center' item xs={4}>
              <Grid item xs={4}>
                <Typography>
                  {currentUser}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Switch checked={!darkMode} color='secondary' onChange={onThemeToggle} name="themeToggle" />}
                  label={!darkMode ? 'Light mode' : 'Dark mode'}
                  />
              </Grid>
              <Grid item xs={4}>
                <Button variant='contained' color='secondary' onClick={onLogoutClicked}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
