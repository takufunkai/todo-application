import React, { useState } from 'react'
import axios from 'axios'

const Registration = props => {

  const [state, setState] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    axios.post("http://localhost:3001/registrations", {
      user: {
        email: state.email,
        password: state.password,
        password_confirmation: state.password_confirmation
      }
    },
    { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log("registration error", error)
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
        <input type='password' 
          name='password_confirmation' 
          placeholder="Password confirmation" 
          value={state.password_confirmation} 
          onChange={handleChange} 
          required/>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Registration
