import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { toggleComplete } from './todosSlice'

export const ToggleCompleteButton = ({ todo }) => {
  const dispatch = useDispatch()

  const handleToggle = async () => {
    try {
      console.log('handling delete of id:', todo.id)
      const resultAction = await dispatch(
        toggleComplete(todo)
      )
      console.log('toggling complete done, id:', todo.id)
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to toggle the todo: ', err)
    }
  }

  return (
    <button onClick={handleToggle}>toggle complete</button>
  )
}