import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { toggleComplete } from './todosSlice'
import { Checkbox } from '@material-ui/core'

export const ToggleCompleteButton = ({ todo }) => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(todo.done)

  const handleToggle = async () => {
    try {
      const resultAction = await dispatch(
        toggleComplete(todo)
      )
      setCheck(!check)
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to toggle the todo: ', err)
    }
  }

  return (
    <Checkbox color='primary' checked={check} onClick={handleToggle} />

  )
}