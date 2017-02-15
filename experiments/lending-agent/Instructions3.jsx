import React from 'react';
import {hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Instructions extends React.Component {
  constructor() {
    super();
    this.start = this.start.bind(this);

    this.start_time = new Date().getTime();
    window.psiTurk.recordTrialData({
      'mark': "instructions3_start",
      'condition': condition,
      'time': this.start_time.valueOf()
    });
  }

  start() {
    window.psiTurk.recordTrialData({
      'mark': "instructions3_stop",
      'time': new Date().valueOf(),
      'condition': condition,
      'response_time': new Date().getTime() - this.start_time
    });

    hashHistory.push("/predict");
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="container-instructions">

        	<h1>Instructions (page 2 of 2)</h1>

        	<hr/>

        	<div className="instructions well">

            <h3>Sample explanation</h3>

            <p>Below is a sample loan application along with its lending score.
            </p>

         <img src="/static/images/Example1_nobar.png" />


              <h3>Sample explanation verified</h3>

              <p>We know that the applicant might have lied on <b>at most one</b> of the responses, and we are allowed to <b>verify
              one response</b>. If an applicant lies it only matters if the lie changes their score from negative to positive.
              In this example we guess that Capital loss was important to the lending score, so we verify that response.</p>

            <p>For this application it turns out the capital loss was a lie! This changes the score to be negative and we should discard the
            application.</p>

          <img src="/static/images/Example2_nobar.png" />


        	    <script type="text/javascript">
        	    //console.log(psiTurk.getInstructionIndicator())
        	    </script>

        	</div>
          <div style={{textAlign: "center"}}>
          <RaisedButton label="Begin Experiment" primary={true} onClick={this.start} />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
