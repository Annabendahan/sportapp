import React, { Component } from 'react';
import './App.css';
import CoursesContainer from './components/CoursesContainer';

class App extends Component {
  render() {
    return (
      <div className="grey-container">
        <header className="App-header">
          <h1> TODOLIST </h1>
          <h2> GET THINGS DONE </h2>
        </header>
        < CoursesContainer />
      </div>
    );
  }
}

export default App;
