/* eslint-disable */

//importing jquery
//disable eslint to use jquery
import jquery from 'jquery';
window.$ = window.jQuery=jquery;

//require is es5
//import is es6
import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom'; //to handle navigation

import {App} from './components/App.js'; //top-level controller (Controller Component)

//App is wrapped inside HashRouter
//HashRouter allows you to cache your links and do hyperlinks
ReactDom.render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('app')); //given to app container
  