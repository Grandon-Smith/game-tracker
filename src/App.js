import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Welcome from './Welcome/Welcome'
import LoginScreen from './LoginScreen/LoginScreen'
import Dashboard from './Dashboard/Dashboard'

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
            exact path='/login'
            component={LoginScreen}
          />
          <Route
            exact path='/dashboard/:user_id'
            component={Dashboard}
          />
        </Switch>
      </div>
  );

  }
    
}

export default App;
