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

            <p>Below is a sample loan application along with its lending score. In this case, how each
            response on the application effects the lending score is represented by the colored bars
            at the top. Red bars represent features that increase the lending score, and blue bars decrease
            the score. The length of the bars are represents how much they change the lending score.</p>

            <p>In the example below the response of having a capital loss of $1,887 is estimated to increase the lending
            score from less than -20 to 6.72. Why? Probably because losing a lot of money on investments means
            you must have a lot to lose.</p>

            <img src="/static/images/Example1.png" />


              <h3>Sample explanation verified</h3>

              <p>We know that the applicant might have lied on one of the reponses, and we are allowed to validate
              one response for a cost of $20. If an applicant lies it only matters if the lie changes their score from negative to positive.
              In this example the most important response for raising their score was Capital loss, so we verify that response.</p>

            <p>For this application it turns out the capital loss was a lie! This changes the score to be negative and we should discard the
            application.</p>

          <img src="/static/images/Example2.png" />


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
