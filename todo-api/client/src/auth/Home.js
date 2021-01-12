import React from 'react'
import { logoutUser } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'


const Home = props => {
  const dispatch = useDispatch()
  const loggedInStatus = useSelector(state => state.auth.loggedInStatus)

  const onLogoutClicked = async () => {
    try {
      await dispatch(logoutUser())
    } catch (err) {
      console.error('Failed to save the todo: ', err)
    }
    console.log(loggedInStatus)
  }
  

  return (
    <div>
      <h1>Todo List 🔥</h1>
      <h1>Status: {loggedInStatus}</h1>
      <button onClick={onLogoutClicked}>
        Logout
      </button>
    </div>
  )
}

export default Home
