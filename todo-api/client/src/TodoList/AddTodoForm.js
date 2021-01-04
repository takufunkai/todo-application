import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { todoAdded } from './todosSlice'

export const AddTodoForm = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  const onTitleChanged = e => setTitle(e.target.value)
  const onTagChanged = e => setTag(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSaveTodoClicked = () => {
    if (title && tag) {
      dispatch(todoAdded(title, tag, userId))
      setTitle('')
      setTag('')
    }
  }

  const canSave = Boolean(title) && Boolean(tag) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Todo</h2>
      <form>
        <label htmlFor="todoTitle">Todo Title:</label>
        <input
          type="text"
          id="todoTitle"
          name="todoTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="todoTag">Tag:</label>
        <textarea
          id="todoTag"
          name="todoTag"
          value={tag}
          onChange={onTagChanged}
        />
        <button type="button" onClick={onSaveTodoClicked} disabled={!canSave}>Save Todo</button>
      </form>
    </section>
  )
}