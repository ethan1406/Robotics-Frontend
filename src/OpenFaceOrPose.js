import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import axios from 'axios';


class OpenFaceOrPose extends Component {

  constructor(props) {
    super(props);

    this.openPoseCheckBox = React.createRef();
    this.openFaceCheckBox = React.createRef();
  }


  // runOpenFace() {

  //   axios.post('http://127.0.0.1:8000/extractFeatures/runOpenFace/', {'filename': })
  //   .then(response=> {
  //     console.log(response);
  //   }).catch(err=> {
  //     console.log(err);
  //   });
  // }

  // runOpenPose() {
  //   axios.post('http://127.0.0.1:8000/extractFeatures/runOpenPose/', {})
  //   .then(response=> {
  //     console.log(response);
  //   }).catch(err=> {
  //     console.log(err);
  //   });
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Video Data Pipeline</h1>
        </header>
        <div className="formContainer">
            <form name="mainVideoInputForm">
                <div className="videoOptionsContainer">
                    <div className="openFaceCheckBoxContainer">
                        <input name="OpenFaceCheckBox" type="checkbox" ref='openFaceCheckBox'/> Run OpenFace
                        <br />
                    </div>
                    <div className="openPoseCheckBoxContainer">
                        <input name="OpenPoseCheckBox" type="checkbox" ref='openPoseCheckBox'/> Run OpenPose
                    </div>
                    <br />
                </div>
                <input type="button" value="Submit" onClick={this.uploadVid}/>
            </form>
        </div>
      </div>
    );
  }
}

export default OpenFaceOrPose;
