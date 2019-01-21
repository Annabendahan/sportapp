import React, { Component } from 'react';
import './App.css';
import CoursesContainer from './components/CoursesContainer';

class App extends Component {
  render() {
    return (
      <div className="grey-container">
        <header className="App-header">
          <h1> <span className="pink">T</span>
               <span className="green">O</span>
               <span className="blue">D</span>
               <span className="yellow">O</span>
               <span  className="pink">L</span>
               <span className="green">I</span>
               <span className="blue">S</span>
               <span className="yellow">T</span> </h1>
        </header>
        < CoursesContainer />
      </div>
    );
  }
}

export default App;
