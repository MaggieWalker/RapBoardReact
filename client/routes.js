import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import GameBoard from './components/GameBoard'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
  }

  render() {

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" />
        <Route path="/signup"  />
        {/* Displays our Login component as a fallback */}
        <Route />
      </Switch>
    )
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)
