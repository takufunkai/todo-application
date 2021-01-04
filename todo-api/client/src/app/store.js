import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../TodoList/todosSlice'
import usersReducer from '../users/usersSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer
  }
})
