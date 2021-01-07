import React from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { deleteTodo } from './todosSlice'
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from '@material-ui/core'

export const DeleteTodoButton = ({ id }) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      console.log('handling delete of id:', id)
      const resultAction = await dispatch(
        deleteTodo(id)
      )
      console.log('deletion done, id:', id)
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to delete the todo: ', err)
    }
  }

  return (
    <Button onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  )
}