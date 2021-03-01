import React, { Component} from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Welcome from '../Welcome/Welcome';
import LoginScreen from '../LoginScreen/LoginScreen';
import Dashboard from '../Dashboard/Dashboard';
import GlobalSearch from '../GlobalSearch/GlobalSearch';
import CreateAccount from '../CreateAccount/CreateAccount';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
};

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
                        exact path='/create-account'
                        component={CreateAccount}
                    />
                    <Route
                        exact path='/dashboard/:user_id'
                        component={Dashboard}
                    />
                    <Route 
                        exact path='/dashboard/game/:gameId'
                        component={Dashboard}
                    />
                    <Route
                        exact path='/dashboard/:user_id/:search'
                        component={GlobalSearch}
                    />
                    <Route
                        exact path='/dashboard/:user_id/:search/:gameId'
                        component={GlobalSearch}
                    />
                </Switch>
            </div>
        );
    };
};

export default App;
