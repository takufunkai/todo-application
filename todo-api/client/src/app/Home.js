import React from 'react'
import Login from '../auth/Login'
import Registration from '../auth/Registration'


const Home = props => {
  
  const handleSuccessfulAuth = data => {
    props.handleLogin(data)
    console.log('login status is still:', data.logged_in)
    props.history.push("/todolist") //they are successful, so push them to the todolist page
  }
  return (
    <div>
      <h1>Hello</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth}/>
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
    </div>
  )
}

export default Home
