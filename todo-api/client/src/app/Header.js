import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { logoutUser } from '../auth/authSlice'
import { Toolbar, Typography, CssBaseline, AppBar, Button } from '@material-ui/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
          <Typography variant="h6" noWrap>
            Todo List -- get it done
          </Typography>
          <Button onClick={onLogoutClicked}>
            <Typography variant="h6" noWrap>
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key='Tasks' component={Link} to={"/todolist"}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Tasks' />
            </ListItem>
            <ListItem button key='Completed' component={Link} to={"/completed"}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Completed' />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main> */}
    </div>
  );
}
