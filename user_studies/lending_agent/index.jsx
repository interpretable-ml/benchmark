import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SimpleListVisualizer from '../../../iml/src/javascript/visualizers/SimpleListVisualizer';
import AdditiveForceVisualizer from '../../../iml/src/javascript/visualizers/AdditiveForceVisualizer';
import AdditiveForceArrayVisualizer from '../../../iml/src/javascript/visualizers/AdditiveForceArrayVisualizer';
import LendingAgent from './LendingAgent';

// Needed for onTouchTap for material-ui
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Save some globals for the inline scripts to access
window.IML = {
  // SimpleListVisualizer: SimpleListVisualizer,
  // AdditiveForceVisualizer: AdditiveForceVisualizer,
  // AdditiveForceArrayVisualizer: AdditiveForceArrayVisualizer,
  LendingAgent: LendingAgent,
  React: React,
  ReactDom: ReactDom
};
