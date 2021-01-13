import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewUser, loginUser } from './authSlice'
import { TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const UserForm = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('login') //determine form type
  const description = status === 'sign_up' ? 'Register' : 'Login'
  const authStatus = useSelector(state => state.auth.authStatus)

  const initialState = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  const [state, setState] = useState(initialState)

  const validRegistration = state.email.length > 2 && state.password.length > 5 && state.password === state.password_confirmation 

  const handleChange = e => {
    const { name, value } = e.target
    setState( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const toggleStatus = () => {
    if (status === 'login') {
      setStatus('sign_up') 
      setState(initialState)
    } else { 
      setStatus('login')
      setState(initialState)
    }
  }

  let message

  if (authStatus === 'bad_credentials' && status === 'login') {
    message = (<h6>Wrong username or password</h6>)
  } else if (!validRegistration && status === 'sign_up') {
    message = (
      <div>

        <li>Ensure email is valid</li>
        <li>Ensure password has at least 6 characters</li>
      </div>
    )
  } else if (validRegistration && status === 'sign_up') {
    message = <div>All good!</div>
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
    }
  }
  

  return (
    <div>
      <h1>{description}</h1>
      <TextField
        type='email' 
        name='email' 
        placeholder="Email" 
        value={state.email} 
        onChange={handleChange} 
        required/>
      <TextField 
        type='password' 
        name='password' 
        placeholder="Password" 
        value={state.password} 
        onChange={handleChange} 
        required/>
      {status === 'sign_up' ? 
        <TextField type='password' 
          name='password_confirmation' 
          placeholder="Password confirmation" 
          value={state.password_confirmation} 
          onChange={handleChange} 
          required/> 
          : null}

        <button onClick={onSubmit}>{description}</button>
        <button onClick={toggleStatus}>{status === 'sign_up' ? "Have an existing account" : "Don't have an account"}</button> 
        <div>
          <h1>{message} </h1>
        </div>
    </div>
  )
}

export default UserForm
