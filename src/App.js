import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react'
export class App extends Component {
  render() {
    return (
      <div>
        {/* @todo show login button and hide the list for unauthenticated users */}
        {/* @todo show logout button and show items list components for authenticated users */}
      </div>
    )
  }
}

export default withAuth0(App);
