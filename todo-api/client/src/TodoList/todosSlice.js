import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//stand-in data before introducing AJAX
const initialState = {
  todos: [],
  status: 'idle',
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('/api/v1/todos/')
  console.log(response.data, 'todosSlice: fetched from rails')
  return response.data
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodos',
  async initialTodo => {
    const response = await axios.post('/api/v1/todos', { todo: initialTodo })
    return response.data
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.todos.push(action.payload)
      },
      prepare(title, tag, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            tag,
            user: userId
          }
        }
      }
    },
    todoUpdated(state, action) {
      const { id, title, tag } = action.payload
      const existingTodo = state.todos.find(todo => todo.id === id)
      if (existingTodo) {
        existingTodo.title = title
        existingTodo.tag = tag
      }
    }
  },
  extraReducers: {
      [fetchTodos.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchTodos.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched todos to the array
        state.todos = state.todos.concat(action.payload)
        console.log('todosSlice: successfully fetched')
      },
      [fetchTodos.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      },
      [addNewTodo.fulfilled]: (state, action) => {
        state.todos.push(action.payload)
      }
  }
})

export const { todoAdded, todoUpdated } = todosSlice.actions

export default todosSlice.reducer

export const selectAllTodos = state => state.todos.todos

export const selectTodoById = (state, todoId) => state.todos.todos.find(todo => todo.id === todoId)