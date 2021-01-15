import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
  currentTag: "Inbox",
  search: '',
  sort: 'by_date_down',
  prioritySort: true,
  darkMode: false,
  allTags: []
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

export const togglePriority = createAsyncThunk(
  'todos/togglePriority',
  async priorityTodo => {
    console.log('toggling "priority" id:', priorityTodo.id, priorityTodo.priority)
    await axios.patch('/api/v1/todos/' + priorityTodo.id, { todo: {
        priority: !priorityTodo.priority
    } })
    return priorityTodo.id
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loggedOut(state, _) {
      state.todos = []
      state.allTags = ['Inbox',]
    },
    toggleCurrentTag(state, action) {
      state.currentTag = action.payload
    },
    handleSearch(state, action) {
      state.search = action.payload
    },
    togglePrioritySort(state, action) {
      state.prioritySort = !state.prioritySort
    },
    changeSort(state, action) {
      state.sort = action.payload
    },
    switchedDarkMode(state, action) {
      state.darkMode = !state.darkMode
    }
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
    [togglePriority.fulfilled]: (state, action) => {
      const existingTodo = state.todos.find(todo => todo.id === action.payload)
      if (existingTodo) {
        existingTodo.priority = !existingTodo.priority
      }
    }
  }
})

export default todosSlice.reducer

export const { loggedOut, handleSearch, searchTodo, toggleCurrentTag, togglePrioritySort, changeSort, switchedDarkMode } = todosSlice.actions

//state selectors

export const selectAllTodos = state => state.todos.todos

export const selectIncompleteTodos = state => (
  state.todos.todos
      .filter(todo => //filter todos based on done-ness, tags(if any) and current search(if any)
      (todo.tag === state.todos.currentTag 
        || state.todos.currentTag === 'Inbox') 
          && !todo.done 
            && todo.title.includes(state.todos.search))
      .sort(state.todos.sort === 'by_date_up' //sort the items based on user preference
        ? (d2, d1) => new Date(d1.due_date).getTime() - new Date(d2.due_date).getTime() 
        : (d1, d2) => new Date(d1.due_date).getTime() - new Date(d2.due_date).getTime())
      .sort(state.todos.prioritySort //sort the items by priority (if activated)
        ? (d1, d2) => (
            d1.priority === d2.priority 
              ? 0 
              : d1.priority 
                ? -1 
                : 1) 
        : undefined )
)

export const selectCompleteTodos = state => (
  state.todos.todos
    .filter(todo => 
      (todo.tag === state.todos.currentTag 
        || state.todos.currentTag === 'Inbox') 
          && todo.done 
            && todo.title.includes(state.todos.search))
    .sort(state.todos.sort === 'by_date_up' 
      ? (d2, d1) => new Date(d1.due_date).getTime() - new Date(d2.due_date).getTime() 
      : (d1, d2) => new Date(d1.due_date).getTime() - new Date(d2.due_date).getTime())
    .sort(state.todos.prioritySort
    ? (d1, d2) => (
        d1.priority === d2.priority 
          ? 0 
          : d1.priority 
            ? -1 
            : 1) 
    : undefined )
)

export const selectTodoById = (state, todoId) => state.todos.todos.find(todo => todo.id === todoId)