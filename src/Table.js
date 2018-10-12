import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import axios from 'axios';
import Plot from 'react-plotly.js';


class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {data: null, plotHide: true};
    this.visualizeData = this.visualizeData.bind(this)
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
        var url = 'http://127.0.0.1:8000/visualizeData/';
        console.log(this.props.checkBox);
        if(this.props.checkBox === 0) {
          url = url + 'runVisualizationOpenFace?fileName=' + this.props.fileName;
        } else if (this.props.checkBox === 1) {
          url = url + 'runVisualizationOpenPose?fileName=' + this.props.fileName;
        }
        

        axios.get(url)
        .then(response=> {
            var xValues = [];
            var yValues = [];
            response.data.data = JSON.parse(response.data.data);

            for (let i = 0; i < response.data.data.length; i++) {
                xValues.push(response.data.data[i][0]);
                yValues.push(response.data.data[i][1]);
            }

            var trace1 = {
                x: xValues,
                y: yValues,
                mode: 'markers',
                type: 'scatter',
                marker: {color: 'red'},
            };

            var dataPlot = [trace1];

            this.setState({data: null, plotData : dataPlot, plotHide : false});
        }).catch(err=> {
          console.log(err);
        });
    }


    createTable = () => {
      let table = [];

      let heads = [];
      heads.push(<th scope="col">#</th>);
      for(var i = 1 ; i < 7; i ++) {
        heads.push(<th key= {i} scope="col">{(this.props.data) ? this.CSVToArray(this.props.data)[0][i] : ''}</th>);
      }
      let headRow = <tr>{heads}</tr>;
      table.push(<thead>{headRow}</thead>);
      
      let childrenRow = [];
      for(let i = 1; i < 6; i++) {
        let children = [];
        children.push(<th scope="row">{i}</th>);
        for(let j = 1; j < 7; j++) {
          children.push(<td key = {i*6 + j}>{(this.props.data) ? this.CSVToArray(this.props.data)[i][j] : ''}</td>);
        }
        childrenRow.push(<tr>{children}</tr>);

      }
      table.push(<tbody>{childrenRow}</tbody>);

      return table;
    }

  render() {
    return (
        <div className="col-sm-8 col-sm-offset-2" style={{display: this.props.hide ? 'none' : 'block', marginTop: '7em'}}>
            <table className="table">
                {this.createTable()}
            </table>
            <h2 className="App-title"> Description (from Panda)</h2>
            <p> Machine Learning Machine LearningMachine LearningMachine LearningMachine
            LearningMachine LearningMachine Learning LearningMachine LearningMachine Learning
            LearningMachine LearningMachine LearningLearningMachine LearningMachine Learning </p>
            <input type="button" value="Visualize" onClick={this.visualizeData}/>

            <div className="plotContainer" style={{display: this.state.plotHide ? 'none' : 'block'}}>
                {
                    (!this.state.plotHide) ? (
                        <Plot data={this.state.plotData} layout={{width: 600, height: 400, title: 'Data Visualization'} } />
                    ): (<div></div>)
                }
            </div>
        </div>
    );
  }
}

export default App;
