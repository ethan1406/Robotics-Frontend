import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Table from './Table';
import './index.css';


// Copied from http:jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
function getUrlVars() {
  var routes = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
  return routes;
}

var url = getUrlVars();

switch (url) {
  case 'table':
    ReactDOM.render(<Table />, document.getElementById('root'));
    break;

  case undefined:
  default:
    ReactDOM.render(<App />, document.getElementById('root'));
    break;
}