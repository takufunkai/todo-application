import { createSlice, nanoid } from '@reduxjs/toolkit'

//stand-in data before introducing AJAX
const initialState = [
  { id: '1', title: 'First Post!', tag: 'Hello!' },
  { id: '2', title: 'Second Post', tag: 'More text' }
]

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.push(action.payload)
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
      const existingTodo = state.find(todo => todo.id === id)
      if (existingTodo) {
        existingTodo.title = title
        existingTodo.tag = tag
      }
    }
  }
})

export const { todoAdded, todoUpdated } = todosSlice.actions

export default todosSlice.reducer