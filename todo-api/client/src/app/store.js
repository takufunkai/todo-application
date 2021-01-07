import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../TodoList/todosSlice'

export default configureStore({
  reducer: {
    todos: todosReducer
  }
})
