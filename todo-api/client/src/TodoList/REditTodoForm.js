import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { todoUpdated } from './todosSlice'

export const EditTodoForm = ({ match }) => {
  const { todoId } = match.params //figure out props

  const todo = useSelector(state =>
    state.todos.find(todo => todo.id === todoId)
  )

  const [title, setTitle] = useState(todo.title)
  const [tag, setTag] = useState(tag.content)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onTagChanged = e => setTag(e.target.value)

  const onSaveTodoClicked = () => {
    if (title && tag) {
      dispatch(todoUpdated({ id: todoId, title, tag }))
    }
  }

  return (
    <section>
      <h2>Edit Tag</h2>
      <form>
        <label htmlFor="todoTitle">Todo Title:</label>
        <input
          type="text"
          id="todoTitle"
          name="todoTitle"
          placeholder="What's on todo"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="todoTag">Tag:</label>
        <textarea
          id="todoTag"
          name="todoTag"
          value={tag}
          onChange={onTagChanged}
        />
      </form>
      <button type="button" onClick={onSaveTodoClicked}>
        Save Tag
      </button>
    </section>
  )
}