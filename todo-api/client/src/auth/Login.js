import React, { useState } from 'react'
import axios from 'axios'

const Login = props => {

  const [state, setState] = useState({
    email: "",
    password: "",
    loginErrors: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    axios.post("http://localhost:3001/sessions", {
      user: {
        email: state.email,
        password: state.password
      }
    },
    { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        props.handleSuccessfulAuth(response.data)
        console.log("success!")
        console.log("rails login is:", response.data.logged_in)
      } else {
        console.log('something happened during login')
      }
    }).catch(error => {
      console.log("login error", error)
    })
    e.preventDefault()
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='email' 
          name='email' 
          placeholder="Email" 
          value={state.email} 
          onChange={handleChange} 
          required/>
        <input 
          type='password' 
          name='password' 
          placeholder="Password" 
          value={state.password} 
          onChange={handleChange} 
          required/>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
