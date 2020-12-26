import React from 'react';
import './App.css';
import TodosList from './components/TodosList';
import Header from './components/UI/Header';

function App() {

  return (
    <div className="App">
        <Header />
        <br/>
        <TodosList />
      </div>
  );
}

export default App;