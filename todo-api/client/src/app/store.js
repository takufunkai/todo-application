import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../TodoList/todosSlice'
import authReducer from '../auth/authSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer
  }
})
