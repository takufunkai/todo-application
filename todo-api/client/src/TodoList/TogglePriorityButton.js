import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { togglePriority } from './todosSlice'
import { Checkbox } from '@material-ui/core'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined';

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
    <Checkbox onClick={handleToggle} icon={<PriorityHighIcon color='primary'/>} checkedIcon={<PriorityHighOutlinedIcon color='secondary' />} checked={check} name="priority" />

  )
}