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
            <div class="videoInputContainer">
    				Video Data: <input name="videoFileInputBox" type="file" />
                <br />
                <label>
                    OpenFace:
                    <input name="OpenFaceCheckBox" type="checkbox" />
                </label>
                <br />
                <label>
                    OpenPose:
                    <input name="OpenPoseCheckBox" type="checkbox" />
                </label>
            </div>
            <br />
            <div>
                <label>
    				OpenFace CSV Data:
    				<input name="openFaceCSVFileInputBox" type="file" />
    			</label>
                <label>
                    OpenPose CSV Data:
                    <input name="openPoseCSVFileInputBox" type="file" />
                </label>
                <br />
    			<input type="submit" value="Submit" />
            </div>
		</form>
      </div>
    );
  }
}

export default App;
