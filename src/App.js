import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Video Data Pipeline</h1>
        </header>
        <form name="mainInputForm">
            <div className="videoInputContainer">
                <label for="videoFileInputBox">Video Data: </label>
                <input name="videoFileInputBox" type="file" />
            </div>
            <br />
            <div className="videoOptionsContainer">
                Run:
                <div className="openFaceCheckBoxContainer">
                    <input name="OpenFaceCheckBox" type="checkbox" />
                    <label for="OpenFaceCheckBox">OpenFace</label>
                    <br />
                </div>
                <div className="openPoseCheckBoxContainer">
                    <input name="OpenPoseCheckBox" type="checkbox" />
                    <label for="OpenPoseCheckBox">OpenPose</label>
                </div>
            </div>
            <br />
            <div className="csvInputContainer">
                <div>
                    <label>OpenFace CSV Data: </label>
        			<input name="openFaceCSVFileInputBox" type="file" />
                </div>
                <div>
                    <label>OpenPose CSV Data:</label>
                    <input name="openPoseCSVFileInputBox" type="file" />
                </div>
                <br />
            </div>
            <input type="submit" value="Submit" />
		</form>
      </div>
    );
  }
}

export default App;
