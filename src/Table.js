import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Video Data Pipeline</h1>
        </header>
        <div className="col-sm-8 col-sm-offset-2">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First2</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
            <h2 className="App-title"> Description </h2>
            <p> Machine Learning Machine LearningMachine LearningMachine LearningMachine 
            LearningMachine LearningMachine Learning LearningMachine LearningMachine Learning
            LearningMachine LearningMachine LearningLearningMachine LearningMachine Learning </p>
        </div>
      </div>
    );
  }
}

export default App;
