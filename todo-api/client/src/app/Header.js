import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { logoutUser } from '../auth/authSlice'
import { Toolbar, Typography, CssBaseline, AppBar, Button, Grid } from '@material-ui/core'

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

  const onLogoutClicked = async () => {
    try {
      await dispatch(logoutUser())
    } catch (err) {
      console.error('Failed to save the todo: ', err)
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container justify='space-around' alignItems='center'>
            <Grid item>
              <Typography variant="h4" noWrap>
                Todo List
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='outlined' color='secondary' onClick={onLogoutClicked}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
