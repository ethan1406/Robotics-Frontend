import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import axios from 'axios';
import FormData from 'form-data';


class App extends Component {

  constructor(props) {
    super(props);
    this.videoInput = React.createRef();
    this.uploadVid = this.uploadVid.bind(this);
  }

  uploadVid() {
    var formData = new FormData();
    formData.append('myfile', this.videoInput.current.files[0]);
    // console.log(this.videoInput.current.value.files[0]);

    axios.post('http://127.0.0.1:8000/uploadVideo/videos/', formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(response => {
      console.log(response);
    }).catch(err=>{
      console.log(err);
    });
  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Video Data Pipeline</h1>
        </header>
        <div className="formContainer">
            <form name="mainVideoInputForm">
                <div className="videoInputContainer">
                    <label htmlFor="videoFileInputBox">Video Data: </label>
                    <input name="videoFileInputBox" type="file" accept=".mp4,.avi,.jpeg,.mov" ref={this.videoInput}/>
                </div>
                <br />
                <div className="videoOptionsContainer">
                    <div className="openFaceCheckBoxContainer">
                        <input name="OpenFaceCheckBox" type="checkbox"/> Run OpenFace
                        <br />
                    </div>
                    <div className="openPoseCheckBoxContainer">
                        <input name="OpenPoseCheckBox" type="checkbox" /> Run OpenPose
                    </div>
                    <br />
                </div>
                <input type="submit" value="Submit" onClick={this.uploadVid}/>
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
                <input type="button" value="Submit"/>
    		</form>
        </div>
      </div>
    );
  }
}

export default App;
