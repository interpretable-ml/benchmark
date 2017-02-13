import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Instructions extends React.Component {
  constructor() {
    super();
  }

  discard_application() {
    this.index++;
    this.setState({panel_props: {
      data: lending_data[this.index],
      discard_application: ()=>this.discard_application(),
      submit_application: x=>this.submit_application(x),
      total: lending_data.length,
      position: this.index
    }});
    this.render();
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

              <p>We know that the applicant might have lied on one of the reponses, and we are allowed to validate
              one response for a cost of $20. If an applicant lies it only matters if the lie changes their score from negative to positive.
              In this example we guess that Capital loss was important to the lending score, so we verify that response.</p>

            <p>For this application it turns out the capital loss was a lie! This changes the score to be negative and we should discard the
            application.</p>

          <img src="/static/images/Example2_nobar.png" />


        	    <script type="text/javascript">
        	    //console.log(psiTurk.getInstructionIndicator())
        	    </script>

        	</div>
          <div style={{textAlign: "center"}}>
          <Link to="/predict"><RaisedButton label="Begin Experiment" primary={true} /></Link>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
