import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { Grid, TextField, Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { addNewTodo } from './todosSlice'

export const AddTodoForm = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const user_id = useSelector(state => state.auth.user.id)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onTagChanged = e => setTag(e.target.value)

  const canSave = [title, tag].every(Boolean) && addRequestStatus === 'idle'

  const onSaveTodoClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTodo({ title, tag, user_id })
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
    <Grid container spacing={4}>
        <Grid item>
            <TextField 
                placeholder="title" 
                type="text" 
                name="todoTitle" 
                value={title} 
                onChange={onTitleChanged}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        onSaveTodoClicked()
                    }
                }} />
        </Grid>
        <Grid item> 
            <TextField 
                placeholder="tag"
                type="text" 
                name="todoTag" 
                value={tag} 
                onChange={onTagChanged}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      onSaveTodoClicked();
                    }
                }} />
        </Grid>
        <Button type="submit" color="primary" onClick={onSaveTodoClicked}>
            <AddCircleOutlineIcon height={2}/>
        </Button>
      </Grid>
  )
}