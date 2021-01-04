import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewTodo } from './todosSlice'

export const AddTodoForm = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onTagChanged = e => setTag(e.target.value)

  const canSave = [title, tag].every(Boolean) && addRequestStatus === 'idle'

  const onSaveTodoClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTodo({ title, tag })
        )
        unwrapResult(resultAction)
        setTitle('')
        setTag('')
      } catch (err) {
        console.error('Failed to save the todo: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

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