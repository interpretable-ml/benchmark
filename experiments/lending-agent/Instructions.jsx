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

        	<h1>Instructions for part 1</h1>

        	<hr/>

        	<div className="instructions well">

        	    <p>
        		    There are two parts to this HIT:
        	    </p>

        			<h2>Part 1: Allocate money among a group of people</h2>
        			<p>You will be told a very short story about how three men
        			answer questions to get money. You will then be asked to
        			"fairly" distribute the money they win among the three men.</p>




        	    <script type="text/javascript">
        	    //console.log(psiTurk.getInstructionIndicator())
        	    </script>

        	</div>
          <div style={{textAlign: "center"}}>
          <Link to="/allocate"><RaisedButton label="Next >" primary={true} /></Link>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
