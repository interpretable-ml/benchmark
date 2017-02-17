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
    psiTurk.saveData({
      success: function(){
          psiTurk.completeHIT();
      },
      error: this.prompt_resubmit
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="container-instructions">

        	<h1>Sorry!</h1>

        	<hr/>

        	<div className="instructions well">

            If you complete this hit and are one of the mentioned workers then I will give you a 0.30 bonus.

            
        	    <script type="text/javascript">
        	    //console.log(psiTurk.getInstructionIndicator())
        	    </script>

        	</div>
          <div style={{textAlign: "center"}}>
          <RaisedButton label="Complete HIT" primary={true} onClick={this.next_page} />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
