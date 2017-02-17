import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Instructions from './Instructions'
import Allocate1 from './Allocate1'
import Allocate2 from './Allocate2'
import Allocate3 from './Allocate3'
import Debrief from './Debrief'

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Router history={hashHistory}>
            <Route path="/" component={Instructions} />
            <Route path="/allocate1" component={Allocate1} />
            <Route path="/allocate2" component={Allocate2} />
            <Route path="/allocate3" component={Allocate3} />
            <Route path="/debrief" component={Debrief} />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}
