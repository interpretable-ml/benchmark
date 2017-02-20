import React from 'react';
import {Link, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class AssignCompetitiveLoss extends React.Component {
  constructor() {
    super();
    this.state = {
      fever: 0,
      cough: 0,
      headache: 0
    };
    this.start_time = new Date().getTime();
    this.handleChange = this.handleChange.bind(this);

    window.psiTurk.recordTrialData({
      'mark': "assign_start",
      'time': this.start_time.valueOf()
    });
  }

  handleChange(event) {
    if (event.target.value !== undefined) {
      var data = {};
      data[event.target.name] = event.target.value;
      this.setState(data);
    }
  }

  saveAnswers() {
    if (parseInt(this.state.fever) + parseInt(this.state.cough) + parseInt(this.state.congestion) === 0) {
      alert("Please consider carefully how to assign blame among the symptoms before submitting.");
    } else {
      window.psiTurk.recordTrialData({
        'mark': "assign_stop",
        'fever': true,
        'cough': true,
        'headache': true,
        'fever_credit': parseInt(this.state.fever),
        'cough_credit': parseInt(this.state.cough),
        'headache_credit': parseInt(this.state.headache),
        'time': new Date().valueOf(),
        'condition': condition,
        'response_time': new Date().getTime() - this.start_time
      });

      hashHistory.push("/debrief");
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="container-instructions">

        	<h1>Assign blame among a set of symptoms</h1>

        	<hr/>

        	<div className="instructions well">

              <p>People are diagnosed using a "sickness score" computed in the following manner:</p>

              <div style={{textAlign: "center"}}>
              <table style={{display: "inline-block", textAlign: "left"}}><tbody>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    If they have a fever <i>OR</i> a cough but not both:
                  </td>
                  <td>
                    +4 points
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    If they have a fever:
                  </td>
                  <td>
                    +1 point
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    If they have a cough:
                  </td>
                  <td>
                    +1 point
                  </td>
                </tr>
              </tbody></table>
              </div>
              <br/>
              One person has the following symptoms:<br/>
              <div style={{textAlign: "center"}}>
              <table style={{display: "inline-block", textAlign: "left"}}><tbody>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    Fever:
                  </td>
                  <td style={{fontWeight: "bold", color: "#990000"}}>
                    YES
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    Cough:
                  </td>
                  <td style={{fontWeight: "bold", color: "#990000"}}>
                    YES
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    Headache:
                  </td>
                  <td style={{fontWeight: "bold", color: "#990000"}}>
                    YES
                  </td>
                </tr>
              </tbody></table>
              </div>
              This leads to a sickness score of <b>2 points</b> becase:<br/>
              <div style={{textAlign: "center"}}>
              <table style={{display: "inline-block", textAlign: "left"}}><tbody>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    They have a fever:
                  </td>
                  <td style={{fontWeight: "bold"}}>
                    +1 point
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    They have a cough:
                  </td>
                  <td style={{fontWeight: "bold"}}>
                    +1 point
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    Total sickness score:
                  </td>
                  <td style={{fontWeight: "bold"}}>
                    2 points
                  </td>
                </tr>
              </tbody></table>
              </div>
              <br/>
              Using numbers please assign blame for their sickness score of <b>2 points</b> among the following symptoms:<br/>

            <br/><br/>
              <div style={{textAlign: "center"}}>
              <table style={{display: "inline-block", textAlign: "left"}}><tbody>
                <tr>
                  <td style={{textAlign: "center", width: "150px"}}>
                    <TextField name="fever" value={this.state.fever} onChange={this.handleChange} style={{width: "20px", marginLeft: 3, marginRight: 3}} /> point(s)<br/>
                    Fever: <b style={{color: "#990000"}}>YES</b>
                  </td>
                  <td style={{textAlign: "center", width: "150px"}}>
                    <TextField name="cough" value={this.state.cough} onChange={this.handleChange} style={{width: "20px", marginLeft: 3, marginRight: 3}} /> point(s)<br/>
                    Cough: <b style={{color: "#990000"}}>YES</b>
                  </td>
                  <td style={{textAlign: "center", width: "150px"}}>
                    <TextField name="headache" value={this.state.headache} onChange={this.handleChange} style={{width: "20px", marginLeft: 3}} /> point(s)<br/>
                    Headache: <b style={{color: "#990000"}}>YES</b>
                  </td>
                </tr>
              </tbody></table>
              </div>

        	</div>
          <div style={{textAlign: "center"}}>
          <RaisedButton label="Submit answer" primary={true} onClick={()=>this.saveAnswers()} />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
