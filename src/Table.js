import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import axios from 'axios';


class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {data: null};
  }


  // componentDidUpdate(prevProps) {
  //   console.log('here');
  //   if(this.props.data != null && this.props.data != undefined) {
  //     this.setState({data : this.CSVToArray(this.props.data)});
  //   }

  //   return null;
  // }

  CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }

    visualizeData() {
        console.log("Begin Visualization logic on back end");
        var url = 'http://127.0.0.1:8000/visualizeData/runVisualization';
        // if(this.openFaceCheckBox.current.value === 'on') {
        //     url = url + 'runOpenFace?filename=' + this.state.uploadVidFileName;
        // } else if(this.openPoseCheckBox.current.value) {
        //     url = url + 'runOpenPose?filename=' + this.state.uploadVidFileName;
        // }

        axios.get(url)
        .then(response=> {
            console.log(response.data);

        }).catch(err=> {
          console.log(err);
        });
    }



  render() {
    return (

        <div className="col-sm-8 col-sm-offset-2" style={{display: this.props.hide ? 'none' : 'block', marginTop: '7em'}}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">face_id</th>
                  <th scope="col">timestamp</th>
                  <th scope="col">confidence</th>
                  <th scope="col">success</th>
                  <th scope="col">gaze_0_x</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[1][1] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[1][2] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[1][3] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[1][4] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[1][5] : ''}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[2][1] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[2][2] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[2][3] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[2][4] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[2][5] : ''}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[3][1] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[3][2] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[3][3] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[3][4] : ''}</td>
                  <td>{(this.props.data) ? this.CSVToArray(this.props.data)[3][5] : ''}</td>
                </tr>
              </tbody>
            </table>
            <h2 className="App-title"> Description (from Panda)</h2>
            <p> Machine Learning Machine LearningMachine LearningMachine LearningMachine
            LearningMachine LearningMachine Learning LearningMachine LearningMachine Learning
            LearningMachine LearningMachine LearningLearningMachine LearningMachine Learning </p>
            <input type="button" value="Visualize" onClick={this.visualizeData}/>
        </div>
    );
  }
}

export default App;
