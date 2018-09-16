import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Video Data Pipeline</h1>
        </header>
        <div className="formContainer">
            <form name="mainVideoInputForm">
                <div className="videoInputContainer">
                    <label for="videoFileInputBox">Video Data: </label>
                    <input name="videoFileInputBox" type="file" accept=".mp4,.avi,jpeg"/>
                </div>
                <br />
                <div className="videoOptionsContainer">
                    <div className="openFaceCheckBoxContainer">
                        <input name="OpenFaceCheckBox" type="checkbox" /> Run OpenFace
                        <br />
                    </div>
                    <div className="openPoseCheckBoxContainer">
                        <input name="OpenPoseCheckBox" type="checkbox" /> Run OpenPose
                    </div>
                    <br />
                </div>
                <input type="submit" value="Submit" />
            </form>
            <form name="mainCSVInputForm">
                <br />
                <div className="csvInputContainer">
                    <div>
                        <label>OpenFace CSV: </label>
            			<input name="openFaceCSVFileInputBox" type="file" accept=".csv"/>
                    </div>
                    <br />
                    <div>
                        <label>OpenPose CSV: </label>
                        <input name="openPoseCSVFileInputBox" type="file" accept=".csv"/>
                    </div>
                    <br />
                </div>
                <input type="submit" value="Submit" />
    		</form>
        </div>
      </div>
    );
  }
}

export default App;
