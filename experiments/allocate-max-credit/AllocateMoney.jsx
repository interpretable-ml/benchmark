import React from 'react';
import {Link, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class AllocateMoney extends React.Component {
  constructor() {
    super();
    this.state = {
      man1: 0,
      man2: 0,
      man3: 0
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
    if (parseInt(this.state.man1) + parseInt(this.state.man2) + parseInt(this.state.man3) !== 5) {
      alert("Please allocate exactly $5 among the three men before continuing.");
    } else {
      window.psiTurk.recordTrialData({
        'mark': "allocate_stop",
        'man1': parseInt(this.state.man1),
        'man2': parseInt(this.state.man2),
        'man3': parseInt(this.state.man3),
        'time': new Date().valueOf(),
        'response_time': new Date().getTime() - this.start_time
      });

      hashHistory.push("/debrief");
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div id="container-instructions">

        	<h1>Allocate money among a group of people </h1>

        	<hr/>

        	<div className="instructions well">

              <p>Imagine a scenario where three men are waiting outside a room.</p>

              <p>Each is brought into the room one at a time and asked 5 questions.
                The first man got all 5 questions correct, the second man 4 correct,
                and the third man got nothing right.</p>

              <p>After the questions the men are awarded according to the most questions
                that anyone got right. In this case they get $5 because someone got 5 questions right.</p>

              <p>How would you allocate the $5 winnings among the three men?</p>

              <table><tbody>
                <tr>
                  <td>First man: $<TextField name="man1" value={this.state.man1} onChange={this.handleChange} style={{width: "50px", marginLeft: 3, marginRight: 30}} /></td>
                  <td>Second man: $<TextField name="man2" value={this.state.man2} onChange={this.handleChange} style={{width: "50px", marginLeft: 3, marginRight: 30}} /></td>
                  <td>Third man: $<TextField name="man3" value={this.state.man3} onChange={this.handleChange} style={{width: "50px", marginLeft: 3}} /></td>
                </tr>
              </tbody></table>

        	</div>
          <div style={{textAlign: "center"}}>
          <RaisedButton label="Submit answer" primary={true} onClick={()=>this.saveAnswers()} />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
