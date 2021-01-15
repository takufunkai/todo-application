import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewUser, loginUser } from './authSlice'
import { TextField, Snackbar, Grid, Paper, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserForm = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('login') //determine form type
  const description = status === 'sign_up' ? 'Register' : 'Login'
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('idle')

  const initialState = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  const [state, setState] = useState(initialState)

  const validRegistration = state.email.length > 2 && state.password.length > 5 && state.password === state.password_confirmation 

  let statusMessage
  let emailValidMessage
  let passwordValidMessage

  if (status ==='sign_up') { 
    statusMessage = "Have an existing account?"
    emailValidMessage = "Ensure email is valid"
    passwordValidMessage = "At least 6 characters long"
  } else {
    statusMessage = "Don't have an account"
    emailValidMessage = ""
    passwordValidMessage = ""
  }

  const handleChange = e => {
    handleClose()
    const { name, value } = e.target
    setState( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setType('idle')
    setOpen(false);
  };

  const PopUp = ({type}) => {
    let popMessage
    let severity
    if (type === 'sign_up_fail') {
      popMessage = 'Ensure email and password are valid'
      severity='error'
    } else if (type === 'login_fail') {
      popMessage = 'Invalid login details'
      severity='error'
    }
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {popMessage}
        </Alert>
      </Snackbar>
    )
  }

  const toggleStatus = () => {
    if (status === 'login') {
      setStatus('sign_up') 
      setState(initialState)
      setOpen(false)
      setType('idle')
    } else { 
      setStatus('login')
      setState(initialState)
      setOpen(false)
      setType('idle')
    }
  }

  const onSubmit = async () => {
    if (status === 'sign_up') {
      if (validRegistration) {
        try {
          const resultAction = await dispatch(
            addNewUser(state)
          )
          unwrapResult(resultAction)
          setState({
            email:"",
            password: "",
            password_confirmation: ""
          })
        } catch (err) {
          console.error('Failed to register user: ', err)
        }
      } else {
        setState({
          email:"",
          password: "",
          password_confirmation: ""
        })
        setOpen(true)
        setType('sign_up_fail')
      }
    } else {
      const email = state.email
      const password = state.password
      try {
        const resultAction = await dispatch(
          loginUser({ email, password })
        )
        unwrapResult(resultAction)
        setState({
          email:"",
          password: ""
        })
      } catch (err) {
        console.error('Failed to login user: ', err)
      }
      setOpen(true)
      setType('login_fail')
    }
  }
  

  return (
    <Grid container direction='column'>
      <Grid item style={{marginTop: 150}} />
      <Grid item>
        <Paper style={{marginLeft: '40%', marginRight: '40%', paddingBottom: 90, paddingTop: 30}}>
          <Grid container direction ='column'>
            <Grid item container>
              <Grid item xs={2} />
              <Grid item xs={8}>
                  <div>
                  <Typography>
                    Just another To-do List
                  </Typography>
                  <Typography variant= 'h3'>
                    {description}
                  </Typography>
                  <TextField
                    
                    type='email'
                    variant='filled' 
                    name='email' 
                    value={state.email} 
                    onChange={handleChange} 
                    helperText={emailValidMessage}
                    required
                    label="Email"
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                          onSubmit()
                      }
                    }}/>
                    <br/>
                  <TextField 
                    type='password' 
                    name='password' 
                    variant='filled' 
                    value={state.password} 
                    onChange={handleChange} 
                    helperText={passwordValidMessage}
                    required
                    label="Password"
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                          onSubmit()
                      }
                    }}/>
                    <br/>
                  {status === 'sign_up' ? 
                    <TextField 
                    type='password' 
                    variant='filled' 
                    name='password_confirmation' 
                    value={state.password_confirmation} 
                    onChange={handleChange} 
                    required
                    label="Password confirmation"
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                          onSubmit()
                      }
                    }}/> 
                    : null}
                  <br/>
                  <button onClick={onSubmit}>{description}</button>
                  <button onClick={toggleStatus}>{statusMessage}</button>
                  <PopUp type={type} />
                </div>
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserForm
