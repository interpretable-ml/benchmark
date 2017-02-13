import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Instructions extends React.Component {
  constructor() {
    super();
  }

  finish(answer) {
    window.psiTurk.recordTrialData({
      'phase': "TEST",
      'type': "agree",
      'answer': answer,
      'text': this.text
    });

    psiTurk.saveData({
      success: function(){
          psiTurk.completeHIT();
          window.close();
      },
      error: this.prompt_resubmit
    });
  }

  handleChange(event) {
    this.text = event.target.value;
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="container-instructions">

        	<h1>Debriefing</h1>

        	<hr/>

        	<div className="instructions well">

            <p>Thank you for your participation in our study!  Your anonymous data makes an
        		important contribution to our understanding of human machine interaction. </p>

          <p>If you have any questions about this research, you may contact Scott Lundberg (slund1@cs.washington.edu).</p>
          <br />
            <p>I feel that I have been adequately debriefed about the nature
    					of the study.  The investigator has explained the purposes of the
    					research to me, and I feel that any questions I have asked were
    					satisfactorily answered.</p>

            <div style={{textAlign: "center"}}>
            <TextField style={{width: "400px"}}
                hintText="Comments"
                multiLine={true}
                rows={2}
                rowsMax={8}
                onChange={this.handleChange}
              />
          </div>

        	    <script type="text/javascript">
        	    //console.log(psiTurk.getInstructionIndicator())
        	    </script>

        	</div>
          <div style={{textAlign: "center"}}>
          <RaisedButton onClick={()=>this.finish("agree")} label="Yes, I agree." primary={true} /><br/><br/>
          <RaisedButton onClick={()=>this.finish("questions")} label="No, please withhold my data. I will contact the experimenter with questions." />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
