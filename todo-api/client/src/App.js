import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import TodosList from './TodoList/TodosList';
import Header from './UI/Header';
import CompletedList from './TodoList/CompletedList';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
      </div>
        <div className="App">
          <Route path="/" exact component={TodosList} />
          <Route path="/completed" component={CompletedList} />
        </div>
    </Router>
  );
}

export default App;
