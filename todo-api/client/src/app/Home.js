import React from 'react'
import Login from '../auth/Login'
import Registration from '../auth/Registration'
import axios from 'axios'


const Home = props => {
  
  const handleSuccessfulAuth = data => {
    props.handleLogin(data)
    console.log('login status is still:', data.logged_in)
    props.history.push("/todolist") //they are successful, so push them to the todolist page
  }

  function handleLogoutClick() {
    axios.delete("http://localhost:3001/logout", 
    {withCredentials: true})
    .then(response => props.handleLogout())
    .then(console.log('logging out'))
    .catch(error => console.log('unable to logout', error))
  }
  return (
    <div>
      <h1>Hello</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <button onClick={handleLogoutClick}>
        Logout
      </button>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth}/>
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
    </div>
  )
}

export default Home
