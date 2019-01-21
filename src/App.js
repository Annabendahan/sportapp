import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoursesContainer from './components/CoursesContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Sport App </h1>
        </header>
        < CoursesContainer />
      </div>
    );
  }
}

export default App;
