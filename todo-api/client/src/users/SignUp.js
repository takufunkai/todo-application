import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const SignUp = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState('')

  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)
  const onPasswordConfirmationChange = e => setPasswordConfirmation(e.target.value)

  const handleSubmit = e => {
    console.log('logging in:', username, email)
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    axios.post('http://localhost:3001/users', {user} , {withCredentials: true})
    .then(response => {
      if(response.data.status === 'created') {
        props.handleLogin(response.data)
        redirect()
      } else {
        setErrors({ errors: response.data.errors })
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  
  const redirect = () => {
    props.history.push('/')
  }

  const shandleErrors = () => {
    return (
      <div>
        <ul>{errors.map((error)=> {
          return <li key={error}>{error}</li> 
        })}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <TextField
        placeholder="username"
        type="text"
        name="username"
        value={username}
        onChange={onUsernameChange}
      />
      <TextField
        placeholder="email"
        type="text"
        name="email"
        value={email}
        onChange={onEmailChange}
      />
      <TextField
        placeholder="password"
        type="text"
        name="password"
        value={password}
        onChange={onPasswordChange}
      />
      <TextField 
        placeholder='password confirmation'
        type='password'
        name='password_confirmation'
        value={passwordConfirmation}
        onChange={onPasswordConfirmationChange}
      />
      <Button
        placeholder="submit"
        type="submit"
        onClick={handleSubmit}>
          Sign Up
      </Button>
      <div>
        or <Link to='/login'>log in</Link>
      </div>
    </div>
  )
}
