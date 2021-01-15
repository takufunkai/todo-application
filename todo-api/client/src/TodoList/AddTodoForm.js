import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { Grid, TextField, Button, Checkbox, FormControlLabel, InputLabel, Select, MenuItem } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { togglePrioritySort, changeSort } from './todosSlice'
import SortIcon from '@material-ui/icons/Sort';
import { addNewTodo } from './todosSlice'

export const AddTodoForm = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const user_id = useSelector(state => state.auth.user.id)
  const prioritySort = useSelector(state => state.todos.prioritySort)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onTagChanged = e => setTag(e.target.value)
  const onDueDateChanged = e => setDueDate(e.target.value)

  const handlePriorityChange = e => dispatch(togglePrioritySort())

  const handleSortChange = e => dispatch(changeSort(e.target.value))

  const canSave = [title, dueDate].every(Boolean) && addRequestStatus === 'idle'

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
    <Grid container spacing={2} wrap='nowrap' alignItems='center'>
        <Grid item>
            <TextField 
                label="Tasks"
                color='secondary'
                variant='outlined'
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
        <Grid item> 
          <TextField 
            label="Tag"
            color='secondary'
            variant='outlined'
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
          <Grid item>
            <TextField
            color='secondary'
            variant='outlined'
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
          <Grid item>
            <Button 
              type="submit" 
              color="primary" 
              onClick={onSaveTodoClicked} 
              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
              <AddCircleOutlineIcon height={2}/>
            </Button>
          </Grid>
          <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={prioritySort}
                onChange={handlePriorityChange}
                name="checkedB"
                color="primary"
              />
          }
        label="Priorities First"
          />
          </Grid>
          <Grid item>
          <InputLabel id="select-tag-to-display">Sort by deadline</InputLabel>
            <Select
              id="select-tag-to-display"
              defaultValue='by_date_down'
              onChange={handleSortChange}>
              <MenuItem value={'by_date_down'}>
                Ascending
              </MenuItem>
              <MenuItem value={'by_date_up'}>
                Descending
              </MenuItem>
            </Select>  
          </Grid>
    </Grid>
  )
}