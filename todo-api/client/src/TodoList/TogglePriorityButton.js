import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { togglePriority } from './todosSlice'
import { Checkbox } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export const TogglePriorityButton = ({ todo }) => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(todo.priority)

  const handleToggle = async () => {
    console.log(todo.priority, 'current priority')
    try {
      const resultAction = await dispatch(
        togglePriority(todo)
      )
      console.log(resultAction)
      setCheck(!check)
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to toggle priority of the todo: ', err)
    }
  }

  return (
    <Checkbox onClick={handleToggle} icon={<ErrorOutlineIcon color='secondary'/>} checkedIcon={<ErrorIcon color='primary'/>} checked={check} name="priority" />

  )
}