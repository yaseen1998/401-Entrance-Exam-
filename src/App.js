import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButon';
import Watchesworld from './components/Watchesworld';
import Showfav from './components/Showfav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
export class App extends Component {
  render() {
    return (
      <div>
        {/* @todo show login button and hide the list for unauthenticated users */}
        {!this.props.auth0.isAuthenticated ?
        <LoginButton/>:<LogoutButton/>}

        {this.props.auth0.isAuthenticated &&
<Router>
  <div>
        <Switch>
          <Route exact path="/">
          <Watchesworld/>
          </Route>
          <Route path="/showfav">
            <Showfav />
          </Route>
        </Switch>
      </div>
    </Router>}

        {/* @todo show logout button and show items list components for authenticated users */}
        
      </div>
    )
  }
}

export default withAuth0(App);
