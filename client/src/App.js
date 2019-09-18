import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import './App.css';

import Onboard from './onboard'

function App() {
  return (
    <Router>
      {/* <Route path='/' component={Navigation}/> */}
      {/* <Route exact path='/' component={Landing}/> */}
      <Route path='/join' component={Onboard}/>
      {/* <Route path='/login' component={Login}/> */}
    </Router>
  );
}

export default App;
