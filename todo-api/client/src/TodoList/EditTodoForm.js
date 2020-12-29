import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

export default function EditTodoForm(props) {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState(props.todo);

  const handleInputChange = event => {
    const { name, value } = event.target
    setTodo({ ...todo, [name]: value })
  };

  const handleClickOpen = () => {
    console.log(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!todo.title) return;
    props.updateTodo(todo)
    handleClose();
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <CreateOutlinedIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Todo Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lets edit
          </DialogContentText>
            <TextField variant="outlined" type="text" placeholder="title" name="title" value={todo.title} onChange={handleInputChange} />
            <TextField variant="outlined" type="text" placeholder="tag" name="tag" value={todo.tag} onChange={handleInputChange} />

            <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Update
            </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}



//<-- -->
// import React, { useState } from 'react';

// const EditTodoForm = props => {
//   const [todo, setTodo] = useState(props.currentTodo);

//   const handleInputChange = event => {
//     const { name, value } = event.target
//     setTodo({ ...todo, [name]: value })
//   };

//   return (
//       <form onSubmit={event => {
//         event.preventDefault();
//         if (!todo.title) return;
//         props.updateTodo(todo)
//       }}>
//         <label>Title</label>
//         <input type="text" name="title" value={todo.title} onChange={handleInputChange} ></input>
//         <label>Tag</label>
//         <input type="text" name="tag" value={todo.tag} onChange={handleInputChange} ></input>

//         <button>Update Todo</button>
//         <button onClick={() => props.setEditing(false)}>Cancel</button>
//       </form>
//   )
// };