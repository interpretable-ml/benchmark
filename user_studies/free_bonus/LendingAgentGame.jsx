import React from 'react';
import {Link, hashHistory} from 'react-router';
import {scaleLinear} from 'd3-scale';
import {extent} from 'd3-array';
import {format} from 'd3-format';
import {sortBy, reverse, max, range, copy, map, size} from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PredictionPanel from './PredictionPanel'
import lending_data from './lending-data.json'

export default class LendingAgentGame extends React.Component {
  constructor() {
    super();
    this.index = 0;
    this.start_time = new Date().getTime();
    this.discard_application = this.discard_application.bind(this);
    this.submit_application = this.submit_application.bind(this);
    this.verify = this.verify.bind(this);
    this.state = {
      panel_props: {
        data: lending_data[this.index],
        discard_application: this.discard_application,
        submit_application: this.submit_application,
        verify: this.verify,
        total: lending_data.length,
        position: this.index
      },
      balance: 0
    }
  }

  verify() {
    this.setState({balance: this.state.balance - 20});
  }

  discard_application(verify) {
    console.log("verify", verify)
    psiTurk.recordTrialData({
      'phase': "TEST",
      'type': "predict",
      'condition': condition,
      'index': this.index,
      'action': "discard",
      'verify_state': verify.state,
      'verify_key': verify.k,
      'response_time': new Date().getTime() - this.start_time
    });

    this.start_time = new Date().getTime();
    this.index++;
    if (lending_data.length <= this.index) this.finish();
    this.setState({panel_props: {
      data: lending_data[this.index],
      discard_application: this.discard_application,
      submit_application: this.submit_application,
      verify: this.verify,
      total: lending_data.length,
      position: this.index
    }});

    this.render();
  }

  submit_application(verify, right) {
    window.psiTurk.recordTrialData({
      'phase': "TEST",
      'type': "predict",
      'right': right,
      'condition': condition,
      'index': this.index,
      'action': "submit",
      'verify_state': verify.state,
      'verify_key': verify.k,
      'response_time': new Date().getTime() - this.start_time
    });

    this.start_time = new Date().getTime();
    this.index++;
    if (lending_data.length <= this.index) this.finish();
    this.setState({
      panel_props: {
        data: lending_data[this.index],
        discard_application: this.discard_application,
        submit_application: this.submit_application,
        verify: this.verify,
        total: lending_data.length,
        position: this.index
      },
      balance: this.state.balance + (right ? 100 : -100)
    });

    this.render();
  }

  prompt_resubmit() {
    alert("An error occured during data submission!")
  }

  finish() {
    hashHistory.push("/debrief");
  }

  render() {
    return (
      <MuiThemeProvider>
        <center>
          <PredictionPanel {...this.state.panel_props}></PredictionPanel>
          <br></br>
          Your balance: <span style={{fontWeight: "bold", fontSize: "22px"}}>${this.state.balance}</span><br></br>
          <br></br>
          Discarded applications are worth nothing.<br></br>
          If you forward the application to the bank and the true lending score is positive, then you make $100, otherwise you lose $100.
        </center>
      </MuiThemeProvider>
    );
  }
}
