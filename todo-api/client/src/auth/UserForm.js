import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewUser, loginUser } from './authSlice'
import { TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const UserForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [status, setStatus] = useState('login')
  const description = status === 'sign_up' ? 'Register' : 'Login'

  const [state, setState] = useState({
    email: "",
    password: "",
    password_confirmation: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const toggleStatus = () => {
    status === 'login' ? setStatus('sign_up') : setStatus('login')
  }

  const onSubmit = async () => {
    if (status === 'sign_up'){
      try {
        console.log('adding:', state)
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
      toggleStatus()
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
        history.push('/todolist')
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
      {status === 'sign_up' ? <TextField type='password' 
        name='password_confirmation' 
        placeholder="Password confirmation" 
        value={state.password_confirmation} 
        onChange={handleChange} 
        required/> : null}

        <button onClick={onSubmit}>{description}</button>
        <button onClick={toggleStatus}>{status === 'sign_up' ? "Have an account?" : "Don't have an account"}</button> 
    </div>
  )
}

export default UserForm
