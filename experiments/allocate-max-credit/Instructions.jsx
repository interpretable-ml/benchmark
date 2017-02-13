import React from 'react';
import {hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Instructions extends React.Component {
  constructor() {
    super();
    this.next_page = this.next_page.bind(this);
  }

  next_page() {
    if (window.condition === 0) hashHistory.push("/instr2");
    else if (window.condition === 1) hashHistory.push("/instr3");
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="container-instructions">

        	<h1>Instructions (page 1 of 2)</h1>

        	<hr/>

        	<div className="instructions well">

            <h2>Detect simulated lending application fraud</h2>
              <p>In this task you will play the role of a lending agent who has
              recieved many loan applications.</p>

              <p>There is an AI computer algorithm that
              computes a "lending score" for each application. Applications with
              a positive score will be accepted by the bank, while those with a
              negative score will be rejected.</p>

            <p>If you forward an application to the bank and it is accepted you <i>make $100</i> in
              commission (in game money, not real money). But if you send an application to
              the bank and it is rejected you <i>lose $100</i> to pay for the bank's trouble.</p>

              <p>The challenging part is that applicants may have lied (at most once) on their
              application in order to get a better score. Your goal is to make money, and this
              involves guessing if the
              applicant lied in a way that changed their lending score from being negative
              to being positive.</p>
            <span style={{textAlign: "center"}}>
            <b>A bonus of 2X payment for the HIT will be given to the top 20% of workers ranked by money made.</b><br />
            </span>
        	    <script type="text/javascript">
        	    //console.log(psiTurk.getInstructionIndicator())
        	    </script>

        	</div>
          <div style={{textAlign: "center"}}>
          <RaisedButton label="Next >" primary={true} onClick={this.next_page} />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
