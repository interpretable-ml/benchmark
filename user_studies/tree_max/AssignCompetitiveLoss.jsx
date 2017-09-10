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

    if (parseInt(this.state.fever) + parseInt(this.state.cough) === 0) {
      alert("Please consider carefully how to assign non-zero blame among the symptoms before submitting.");
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

              <p>People's risk of having a certain disease is computed in the following manner:</p>

              <div style={{textAlign: "center"}}>
              <table style={{display: "inline-block", textAlign: "left"}}><tbody>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    If they have a fever <i>AND</i> a cough:
                  </td>
                  <td>
                    80
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: "right", padding: "3px"}}>
                    Otherwise:
                  </td>
                  <td>
                    0
                  </td>
                </tr>
              </tbody></table>
            <br/>
            Which can be represented by a simple decision tree:<br/>
          <br/><br/>
              <img src="/static/images/user_test_tree.png" /><br/>
              <br/><br/>
              </div>

              Among all the people an equal proportion have fever AND cough, just fever, just cough, and neither fever nor cough. This means that before a doctor knows a person's symptoms their risk of having the disease is 20 (which is (80+0+0+0)/4, the average risk).<br/>


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
              </tbody></table>
              </div>
              After learning these symptoms, the doctor now knows their risk has <b>increased 60 points</b> from 20 to 80.<br/>
              <br/>
              What portion of this 60 point increase in risk is attributable to each of the two symptoms?<br/>

            <br/><br/>
              <div style={{textAlign: "center"}}>
              <table style={{display: "inline-block", textAlign: "left"}}><tbody>
                <tr>
                  <td style={{textAlign: "center", width: "150px"}}>
                    <TextField name="fever" value={this.state.fever} onChange={this.handleChange} style={{width: "20px", marginLeft: 3, marginRight: 3}} /> points<br/>
                    Fever: <b style={{color: "#990000"}}>YES</b>
                  </td>
                  <td style={{textAlign: "center", width: "150px"}}>
                    <TextField name="cough" value={this.state.cough} onChange={this.handleChange} style={{width: "20px", marginLeft: 3, marginRight: 3}} /> points<br/>
                    Cough: <b style={{color: "#990000"}}>YES</b>
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
