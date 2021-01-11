import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav'
import Welcome from './Welcome/Welcome'
import LoginScreen from './LoginScreen/LoginScreen'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact path='/'
            component={Welcome}
          />
          <Route
            path='/login'
            component={LoginScreen}
          />
        </Switch>
      </div>
  );

  }
    
}

export default App;
