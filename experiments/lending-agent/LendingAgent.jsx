import React from 'react'
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Instructions from './Instructions'
import Instructions2 from './Instructions2'
import Instructions3 from './Instructions3'
import LendingAgentGame from './LendingAgentGame'
import Debriefing from './Debriefing'

export default class LendingAgent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={Instructions} />
          <Route path="/instr2" component={Instructions2} />
          <Route path="/instr2" component={Instructions3} />
          <Route path="/predict" component={LendingAgentGame} />
          <Route path="/debrief" component={Debriefing} />
        </Router>
      </div>
    );
  }
}
