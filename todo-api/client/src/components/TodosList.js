import React from 'react';
import NewTodoForm from './NewTodoForm';
import EditTodoForm from './EditTodoForm';
import API from '../API';
import Todos from './Todos';


const TodosList = props => {

  const { editing, setEditing, currentTodo, updateTodo } = API();
  const { CompletedTodos, PendingTodos } = Todos();



  return (
    <div>
      <div className="todos-list">
        <div>
          {editing ? (
            <EditTodoForm
              setEditing={setEditing}
              currentTodo={currentTodo}
              updateTodo={updateTodo}
            />
          ) : (
            <NewTodoForm />
          )}
        </div>
        <br/>
        <hr/>
        <h1>Tasks</h1>
        <PendingTodos />
        <hr />
        <hr />
        <h1>Completed</h1>
        <CompletedTodos />
      </div>
    </div>
  )
};
export default TodosList;