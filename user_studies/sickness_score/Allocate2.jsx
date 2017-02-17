import React from 'react';
import {Link, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Allocate extends React.Component {
  constructor() {
    super();
    this.state = {
      fever: 0,
      cough: 0,
      congestion: 0
    };
    this.start_time = new Date().getTime();
    this.handleChange = this.handleChange.bind(this);

    window.psiTurk.recordTrialData({
      'mark': "allocate_start",
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
      alert("Please consider carefully how to allocate blame among the symptoms before submitting.");
    } else {
      window.psiTurk.recordTrialData({
        'mark': "allocate_stop",
        'fever': true,
        'cough': true,
        'congestion': true,
        'fever_credit': parseInt(this.state.fever),
        'cough_credit': parseInt(this.state.cough),
        'congestion_credit': parseInt(this.state.congestion),
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

        	<h1>Allocate blame among a set of symptoms</h1>

        	<hr/>

        	<div className="instructions well">

              <p>People are diagnosed using a "sickness score" computed in the following manner:</p>

              <div style={{textAlign: "center"}}>
              <table style={{display: "inline-block", textAlign: "left"}}><tbody>
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
                    If they have both a cough and congestion:
                  </td>
                  <td>
                    +4 points
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    If they have a cough but no congestion:
                  </td>
                  <td>
                    +1 point
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    If they have congestion but no cough:
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
                    Congestion:
                  </td>
                  <td style={{fontWeight: "bold", color: "#990000"}}>
                    YES
                  </td>
                </tr>
              </tbody></table>
              </div>
              This leads to a sickness score of <b>5 points</b> becase:<br/>
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
                    They have both a cough and congestion:
                  </td>
                  <td style={{fontWeight: "bold"}}>
                    +4 points
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    Total sickness score:
                  </td>
                  <td style={{fontWeight: "bold"}}>
                    5 points
                  </td>
                </tr>
              </tbody></table>
              </div>
              <br/>
              Using numbers please allocate blame for their sickness score of <b>5 points</b> among each of the following symptoms:<br/>

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
                    <TextField name="congestion" value={this.state.congestion} onChange={this.handleChange} style={{width: "20px", marginLeft: 3}} /> point(s)<br/>
                    Congestion: <b style={{color: "#990000"}}>YES</b>
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
