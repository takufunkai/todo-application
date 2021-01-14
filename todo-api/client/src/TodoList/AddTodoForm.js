import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { Grid, TextField, Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { addNewTodo } from './todosSlice'

export const AddTodoForm = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [dueDate, setDueDate] = useState('2021-1-25')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const user_id = useSelector(state => state.auth.user.id)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onTagChanged = e => setTag(e.target.value)
  const onDueDateChanged = e => setDueDate(e.target.value)

  const canSave = [title].every(Boolean) && addRequestStatus === 'idle'

  const onSaveTodoClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTodo({ title, tag, user_id, due_date: dueDate })
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
    <Grid container xs={20} spacing={4}>
        <Grid item xs>
            <TextField 
                label="Title"
                type="text" 
                name="todoTitle" 
                value={title} 
                onChange={onTitleChanged}
                InputLabelProps={{
                  shrink: true,
                }}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        onSaveTodoClicked()
                    }
                }} />
        </Grid>
        <Grid item xs> 
          <TextField 
            label="Tag"
            type="text" 
            name="todoTag" 
            value={tag} 
            onChange={onTagChanged}
            InputLabelProps={{
              shrink: true,
            }}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  onSaveTodoClicked();
                }
            }} />
          </Grid>
          <Grid item xs>
            <TextField
            id="dueDate"
            label="Deadline"
            type="date"
            value={dueDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onDueDateChanged}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                onSaveTodoClicked()
              }
            }}
            />
        </Grid>
      <Button type="submit" color="primary" onClick={onSaveTodoClicked}>
          <AddCircleOutlineIcon height={2}/>
      </Button>
    </Grid>
  )
}