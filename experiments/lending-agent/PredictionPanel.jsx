import React from 'react'
import {scaleLinear} from 'd3-scale'
import {extent} from 'd3-array'
import {format} from 'd3-format'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {sortBy, slice, reverse, max, range, copy, map, size} from 'lodash'
import colors from '../../../iml/src/javascript/color-set'
import AdditiveForceVisualizer from '../../../iml/src/javascript/visualizers/AdditiveForceVisualizer'

export default class PredictionPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      verify: {
        state: "open"
      }
    }
  }

  render() {

    let props_vals = this.props.data.raw;
    if (this.state.verify.state === "fixed") {
      props_vals = this.props.data.fixed;
    }
    props_vals.outNames[0] = "lending score";
    this.props.data.raw.outNames[0] = "lending score";
    props_vals.hideBaseValueLabel = true;
    props_vals.hideBars = (condition == 1);

    let sortedFeatureInds = reverse(sortBy(Object.keys(this.props.data.raw.features), k=>k));
    let rows = sortedFeatureInds.map(k => {
      let v1 = this.props.data.raw.features[k].value;
      let v2 = this.props.data.fixed.features[k].value;
      //console.log(v1,v2,this.state)

      let vspan = undefined;
      if (this.state.verify.state === "open") {
        if (v1 !== v2) {
          vspan = <span style={{color: "#999", cursor: "pointer"}} onClick={()=>this.setState({verify: {state: "fixed", key: k}})}> - verify</span>
        } else {
          vspan = <span style={{color: "#999", cursor: "pointer"}} onClick={()=>this.setState({verify: {state: "right", key: k}})}> - verify</span>
        }
      }

      let color = "#000";
      let text_dec = "none";
      let text_color = "#000";
      let replace_val = "";
      if (this.state.verify.key === k) {
        color = "#090";
        if (v1 !== v2) {
          replace_val = this.props.data.fixed.features[k].value;
          text_dec = "line-through";
          text_color = "#900"
        } else {
          text_color = "#090"
        }
      }

      let name = props_vals.featureNames[k];
      let prefix = "";
      if (name === "Capital loss" || name === "Capital gain") prefix = "$"

      return <tr key={k}>
        <td style={{textAlign: "right", fontWeight: "bold", color: color, paddingRight: 5}}>{props_vals.featureNames[k]}:</td>
        <td style={{padding: "3px", color: color}}>
          <span style={{textDecoration: text_dec, color: text_color}}>{prefix}{this.props.data.raw.features[k].value}</span>
          &nbsp;&nbsp;{replace_val}{vspan}
        </td>
      </tr>
    });

    return (
      <div>
        <AdditiveForceVisualizer {...props_vals}></AdditiveForceVisualizer>
        <div style={{marginTop: '0px'}}><center>
          <b>Application {this.props.position+1} of {this.props.total}</b><br></br>
          <br></br>
          <span style={{color: "#666"}}>You can verify only one part of the response.</span><br></br>
          <br></br>
          <table><tbody><tr>
            <td style={{paddingRight: "30px"}}><table><tbody>
              {slice(rows, 0, 4)}
            </tbody></table></td>
            <td style={{paddingRight: "30px"}}><table><tbody>
              {slice(rows, 4, 10)}
            </tbody></table></td>
          </tr></tbody></table>
          <br></br>
          <RaisedButton label="Forward application to bank" primary={true} onClick={()=>{var v = this.state.verify; this.setState({verify: {state: "open"}}); this.props.submit_application(v, this.props.data.fixed.outValue > 0)}} />
          &nbsp;&nbsp;&nbsp;
          <RaisedButton label="Discard application" secondary={true} onClick={()=>{var v = this.state.verify; console.log("v", v); this.setState({verify: {state: "open"}}); console.log("v", v); this.props.discard_application(v)}} /><br></br>
        </center></div>
      </div>
    );
  }
}
