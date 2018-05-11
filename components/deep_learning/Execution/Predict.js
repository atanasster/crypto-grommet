import React from 'react';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';
import { Box, Button } from 'grommet';
import Value from '../../grommet-controls/Value/Value';
import LossHistoryChart from './LossHistoryChart';
import { prepareTestTrainData } from '../../../tensorflow/run/data_preparation';
import periodToTime from '../utils';

class PredictModel extends React.Component {
  state = {
    // eslint-disable-next-line no-undef
    running: false,
  };

  static contextTypes = {
    client: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // http://jsfiddle.net/jlubean/dL5cLjxt/
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      safari: !!navigator.userAgent.match(/Version\/[\d]+.*Safari/),
      iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    });
  }

  async onTrain() {
    const { model } = this.props;
    this.setState({
      running: true,
      timing: undefined,
    });
    if (this.state.safari || this.state.iOS) {
      tf.setBackend('cpu');
      console.log('scaling down to CPU');
    } else {
      tf.setBackend('webgl');
    }
    const beginMs = Date.now();
    try {
      const {
        xTrain, yTrain, xTest, yTest, scalers,
      } = await prepareTestTrainData(model, (status => this.updateStatus(status)));
      console.log(xTrain, yTrain, xTest, yTest, scalers);
    } finally {
      const timing = (Date.now() - beginMs).toFixed(0);
      this.setState({ running: false, timing });
    }
  }
  render() {
    const { model } = this.props;
    if (!model) {
      return null;
    }
    const { running, timing } = this.state;
    const { time, units } = periodToTime(timing);
    return (
      <Box
        direction='row'
        align='center'
        justify='between'
        fill='horizontal'
        border='horizontal'
        pad={{ vertical: 'small' }}
      >
        <Box gap='small'>
          <Button onClick={running ? undefined : () => this.onTrain()} label='predict' />
        </Box>
        <Box direction='row' gap='medium'>
          <Value label={`duration (${units})`} value={time} />
        </Box>
        <LossHistoryChart loss={model.hostory.loss} valLoss={model.hostory.val_loss} />
      </Box>
    );
  }
}

export default PredictModel;
