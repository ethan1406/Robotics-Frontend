import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import logo from './Preloader_4/Preloader_4.gif';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default App;
