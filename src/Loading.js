import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import loadingGif from './Preloader_4/Preloader_4.gif';

class App extends Component {
  render() {
    return (
      <div className="loading" style={{display: this.props.hide ? 'none' : 'block', marginTop: '1em'}}>
        <img src={loadingGif} className="loadingSymbol" alt="loading" />
        <p className="loadingMessage">Processing your data!</p>
        <p className="loadingMessage">This might take a while<span>.</span><span>.</span><span>.</span></p>
      </div>
    );
  }
}

export default App;
