import React from 'react';
import {hashHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class Instructions extends React.Component {
  constructor() {
    super();
    this.next_page = this.next_page.bind(this);

    this.start_time = new Date().getTime();
    window.psiTurk.recordTrialData({
      'mark': "instructions_start",
      'time': this.start_time.valueOf()
    });
  }

  next_page() {
    window.psiTurk.recordTrialData({
      'mark': "instructions_stop",
      'time': new Date().valueOf(),
      'response_time': new Date() - this.start_time
    });

    hashHistory.push("/allocate");
  }

  render() {
    return (
      <div id="container-instructions">
      	<h1>Instructions</h1>
      	<hr/>

      	<div className="instructions well">
          You will be told a short story and then asked to allocate money "fairly" among
          a group of three people.
      	</div>

        <div style={{textAlign: "center"}}>
          <RaisedButton label="Next >" primary={true} onClick={this.next_page} />
        </div>
      </div>
    );
  }
}
