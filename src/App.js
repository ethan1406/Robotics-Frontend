import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import Table from './Table';
import Loading from './Loading';
import axios from 'axios';
import FileSaver from 'file-saver';
import FormData from 'form-data';


class App extends Component {

  constructor(props) {
    super(props);
    this.videoInput = React.createRef();
    this.csvOpenFaceInput = React.createRef();
    this.openPoseCheckBox = React.createRef();
    this.openFaceCheckBox = React.createRef();

    this.uploadVid = this.uploadVid.bind(this);
    this.uploadCSV = this.uploadCSV.bind(this);
    this.runOpenFaceOrPose = this.runOpenFaceOrPose.bind(this);

    this.state = {videoUploaded : false, uploadVidFileName: '', formHide : false,
        tableHide : true, loadingHide : true, csvData: null, checkBox: -1};
  }

  uploadVid() {
    var formData = new FormData();
    formData.append('myfile', this.videoInput.current.files[0]);
    formData.append('size', 'original');

    axios.post('http://127.0.0.1:8000/uploadVideo/videos/', formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(response => {
      var filename;
      var fullPath = this.videoInput.current.value;
      if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
      }

      this.setState({uploadVidFileName: filename, videoUploaded: true});

    }).catch(err=>{
      console.log(err);
    });
  }

  uploadCSV() {
    let openFaceCsv = true;
    var checkBoxVal = -1;
    if(this.csvOpenFaceInput.current.files.length == 0) {
      checkBoxVal = 0;
      openFaceCsv = false;
    } else {
      checkBoxVal = 1;
    }

    this.setState({loadingHide: false, formHide: true});

    var formData = new FormData();
    formData.append('myCSV', this.csvOpenFaceInput.current.files[0]);

    let url = 'http://127.0.0.1:8000/uploadVideo/';
    let appendUrl = openFaceCsv ? 'uploadOpenFaceCSV/' : 'uploadOpenPoseCSV/';
    url += appendUrl;

    var fr = new FileReader();
      var content;
    fr.onload = function(e){
        content = e.target.result;
    };
    fr.readAsText(this.csvOpenFaceInput.current.files[0]);

    axios.post(url, formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(response => {

      var filename;
      var fullPath = openFaceCsv ? this.csvOpenFaceInput.current.value : this.csvOpenPoseInput.current.value;;
      if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
      }

      this.setState({loadingHide: true, formHide: true, tableHide: false, 
          uploadVidFileName: filename, csvData: content, checkBox: checkBoxVal});

    }).catch(err=> {
      console.log(err);
    }); 

  }

   runOpenFaceOrPose() {
    this.setState({loadingHide: false, formHide: true});
    var url = 'http://127.0.0.1:8000/extractFeatures/';
    var checkBoxVal = -1;
    if(this.openFaceCheckBox.current.checked) {
        checkBoxVal = 0;
        url = url + 'runOpenFace?filename=' + this.state.uploadVidFileName;
    } else if(this.openPoseCheckBox.current.checked) {
        checkBoxVal = 1;
        url = url + 'runOpenPose?filename=' + this.state.uploadVidFileName;
    }

    let currentComponent = this;

    axios.get(url)
    .then(response=> {

      var blob = new Blob([response.data], {type: 'text/csv;charset=utf-8'});
      FileSaver.saveAs(blob, this.state.uploadVidFileName + '.csv');

      var _fileData = response.data;

      console.log(this.state.uploadVidFileName);

      axios.get('http://127.0.0.1:8000/extractFeatures/describeData?filename=' + this.state.uploadVidFileName)
      .then(function (response) {
          console.log(response.data.pandaDescription);
          console.log(_fileData);

          currentComponent.setState({tableHide:false, loadingHide: true, videoUploaded: false, pandaDescription: response.data.pandaDescription, csvData: _fileData, checkBox: checkBoxVal});
      })
      .catch(function (error) {
          console.log(error);
      });
    }).catch(err=> {
      console.log(err);
    });
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Video Data Pipeline</h1>
        </header>
        <div className="outerFormContainer" style={{display: this.state.formHide ? 'none' : 'block'}}>
            {
                (!this.state.videoUploaded) ? (
                    <div className="formContainer">
                        <form name="mainVideoInputForm">
                            <div className="videoInputContainer">
                                <label htmlFor="videoFileInputBox">Video Data: </label>
                                <input name="videoFileInputBox" type="file" accept=".mp4,.avi,.jpeg,.mov" ref={this.videoInput}/>
                            </div>
                            <br />
                            <input type="button" value="Submit" onClick={this.uploadVid}/>
                        </form>
                        <form name="mainCSVInputForm">
                            <br />
                            <div className="csvInputContainer">
                                <div>
                                    <label>OpenFace CSV: </label>
                                    <input name="openFaceCSVFileInputBox" type="file" accept=".csv" ref={this.csvOpenFaceInput}/>
                                </div>
                                <br />
                                <div>
                                    <label>OpenPose CSV: </label>
                                    <input name="openPoseCSVFileInputBox" type="file" accept=".csv"/>
                                </div>
                                <br />
                            </div>
                            <input type="button" value="Submit" onClick={this.uploadCSV} />
                        </form>
                    </div>
                ): (
                   <div className="formContainer">
                        <form name="mainVideoInputForm">
                            <div className="videoOptionsContainer">
                                <div className="openFaceCheckBoxContainer">
                                    <input name="OpenFaceCheckBox" type="checkbox" ref={this.openFaceCheckBox}/> Run OpenFace
                                    <br />
                                </div>
                                <div className="openPoseCheckBoxContainer">
                                    <input name="OpenPoseCheckBox" type="checkbox" ref={this.openPoseCheckBox}/> Run OpenPose
                                </div>
                                <br />
                            </div>
                            <input type="button" value="Submit" onClick={this.runOpenFaceOrPose}/>
                        </form>
                    </div>
                )
            }
        </div>

        <Table hide={this.state.tableHide} data={this.state.csvData} pandaDescription={this.state.pandaDescription} fileName = {this.state.uploadVidFileName} checkBox = {this.state.checkBox}/>

        <Loading hide={this.state.loadingHide}/>

      </div>
    );
  }
}

export default App;
