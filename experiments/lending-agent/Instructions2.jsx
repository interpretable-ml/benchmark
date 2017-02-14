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
      'mark': "instructions2_start",
      'condition': condition,
      'time': this.start_time.valueOf()
    });
  }

  start() {
    window.psiTurk.recordTrialData({
      'mark': "instructions2_stop",
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

            <p>Below is a sample loan application along with its lending score. In this case, how each
            response on the application effects the lending score is represented by the colored bars
            at the top. Red bars represent features that increase the lending score, and blue bars decrease
            the score. The length of the bars are represents how much they change the lending score.</p>

            <p>In the example below the response of having a capital loss of $1,887 is estimated to increase the lending
            score from less than -20 to 6.72. Why? Probably because losing a lot of money on investments means
            you must have a lot to lose.</p>

            <img src="/static/images/Example1.png" />


              <h3>Sample explanation verified</h3>

              <p>We know that the applicant might have lied on <b>at most one</b> of the responses, and we are allowed to <b>verify
              one response</b>. If an applicant lies it only matters if the lie changes their score from negative to positive. <b>Usually
            you want to verify the response that matches the largest red bar.</b> In
            this example the most important response for raising their score was Capital loss, so we verify that response.</p>

            <p>For this application it turns out the capital loss was a lie! This changes the score to be negative and we should discard the
            application.</p>

          <img src="/static/images/Example2.png" />


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
