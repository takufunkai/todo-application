import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { updateTodo } from './todosSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const EditTodoForm = ({ todo }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [tag, setTag] = useState(todo.tag)
  const id = todo.id

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onTagChanged = e => setTag(e.target.value)
  const handleClickOpen = () => {
    console.log('currently editing id:', id);
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
  };

  const onSaveTodoClicked = async () => {
    if (title && tag) {
      try {
        console.log('handling update of id:', id)
        const resultAction = await dispatch(
          updateTodo({ id, title, tag })
          )
        console.log('Updated: new title:', title, 'new tag:', tag)
        unwrapResult(resultAction)
        handleClose()
      } catch (err) {
        console.error('Failed to update the todo: ', err)
      }
    }
  }

  return (
    <div>
    <Button color="primary" onClick={handleClickOpen} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} >
      <CreateOutlinedIcon />
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Todo Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lets edit
        </DialogContentText>
          <TextField 
            variant="outlined" 
            type="text" 
            placeholder="title" 
            name="title" 
            value={title} 
            onChange={onTitleChanged} 
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                  onSaveTodoClicked()
            }}} />
          <TextField 
            variant="outlined" 
            type="text" 
            placeholder="tag" 
            name="tag" 
            value={tag} 
            onChange={onTagChanged}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                  onSaveTodoClicked()
            }}} />

          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSaveTodoClicked} color="primary" >
            Update
          </Button>
      </DialogActions>
      </DialogContent>
    </Dialog>
  </div>
  )
}