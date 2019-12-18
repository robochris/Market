import React from 'react';
import logo from './logo.svg';
import Router from './Router';
import './App.css';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render(){
    return(
      <div>
        <Router />
      </div>
    )
  }
}

export default App;
