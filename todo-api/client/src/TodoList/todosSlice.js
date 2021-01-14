import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
  allTags: ['Inbox',]
}

//actions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async userId => {
  const response = await axios.get('/api/v1/todos/')
  return response.data.filter(todo => todo.user_id === userId)
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodos',
  async initialTodo => {
    const response = await axios.post('/api/v1/todos', { todo: initialTodo })
    console.log('added todo:', response.data)
    return response.data
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async id => {
    console.log('initializing delete of:', id)
    await axios.delete( '/api/v1/todos/' + id)
    return id;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async updatedTodo => {
    console.log('initializing update of:', updatedTodo.id)
    await axios.patch('/api/v1/todos/' + updatedTodo.id, { todo: updatedTodo })
    return updatedTodo
  }
)

export const toggleComplete = createAsyncThunk(
  'todos/toggleComplete',
  async doneTodo => {
    console.log('toggling "done" id:', doneTodo.id)
    await axios.patch('/api/v1/todos/' + doneTodo.id, { todo: {
        done: !doneTodo.done
    } })
    return doneTodo.id
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loggedOut(state, _) {
      state.todos = [] //clears the current state of todos
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched todos to the array
      state.todos = action.payload
      //Assigning tags
      action.payload.map(todo => !state.allTags.includes(todo.tag) && todo.tag !== '' ? state.allTags.push(todo.tag) : null)
      console.log('Done! Here is the todos for current user:', action.payload)
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload)
      if (!state.allTags.includes(action.payload.tag) && action.payload.tag !== '') {
        state.allTags.push(action.payload.tag)
      }
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    [updateTodo.fulfilled]: (state, action) => {
      const existingTodo = state.todos.find(todo => todo.id === action.payload.id)
      if (existingTodo) {
        existingTodo.title = action.payload.title
        existingTodo.tag = action.payload.tag
      }
    },
    [toggleComplete.fulfilled]: (state, action) => {
      const existingTodo = state.todos.find(todo => todo.id === action.payload)
      if (existingTodo) {
        existingTodo.done = !existingTodo.done
      }
    },
  }
})

export default todosSlice.reducer

export const { loggedOut, searchTodo } = todosSlice.actions

//state selectors
export const selectAllTodos = state => state.todos.todos

export const selectCompleteTodos = state => state.todos.todos.filter(todo => todo.done)

export const selectIncompleteTodos = state => state.todos.todos.filter(todo => !todo.done)

export const selectTodoById = (state, todoId) => state.todos.todos.find(todo => todo.id === todoId)