import React from 'react';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';
import { Box, Button } from 'grommet';
import Value from '../../grommet-controls/Value/Value';
import LossHistoryChart from './LossHistoryChart';
import { addHistory } from './history';

class TrainModel extends React.Component {
  state = {
    running: false,
    lossHistory: [],
  }
  static contextTypes = {
    client: PropTypes.object.isRequired,
  }
  async onTrain() {
    const { model: nn } = this.props;
    console.log(this.context);
    const beginMs = Date.now();
    // Generate some synthetic data for training. (y = 2x - 1)
    const xs = tf.tensor2d([[-1, 0, 1], [-3, 1, 2], [5, 4, 2], [6, 2, 1]], [4, 3]);
    const ys = tf.tensor2d([-3, -1, 1, 3], [4, 1]);
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [3] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({
      loss: nn.loss,
      optimizer: nn.optimizer.tf(),
      metrics: ['mae', 'mape'],
    });

    // Train the model using the data.
    const history = await model.fit(xs, ys, {
      epochs: nn.epochs,
      batchSize: nn.batchSize,
      validationSplit: 0.3,
      callbacks: {
        onTrainBegin: async (logs) => {
          this.setState({ running: true, lossHistory: [] });
          console.log('Training begin', logs);
          await tf.nextFrame();
        },
        onTrainEnd: async (logs) => {
          console.log('Training end', logs);
          await tf.nextFrame();
        },
        onEpochEnd: async (epoch, logs) => {
          if (!Number.isNaN(logs.loss)) {
            const loss = logs.loss.toFixed(5);

            this.setState({
              epoch,
              loss,
              timing: (Date.now() - beginMs).toFixed(0),
              lossHistory: [...this.state.lossHistory, loss],
            });
          }
          await tf.nextFrame();
        },
      },
    });
    console.log('history', history);
    const timing = (Date.now() - beginMs).toFixed(0);
    this.setState({ running: false, timing });
    if (history.history.loss.length > 0) {
      const item = {
        date: Date.now(),
        timing,
        loss: history.history.loss[history.history.loss.length - 1],
        lossHistory: history.history.loss,
        epochs: nn.epochs,
        batchSize: nn.batchSize,
      };
      addHistory(item);
    }
    // Use the model to do inference on a data point the model hasn't seen.
    // Should print approximately 39.
    model.predict(tf.tensor2d([[-1, 0, 1], [-3, 1, 2], [5, 4, 2], [6, 2, 1]], [4, 3]))
      .print();
  }
  render() {
    const {
      epoch, loss, running, timing, lossHistory,
    } = this.state;
    return (
      <Box
        direction='row'
        align='center'
        justify='between'
        fill='horizontal'
        border='horizontal'
        pad={{ vertical: 'small' }}
      >
        <Button onClick={running ? undefined : () => this.onTrain()} label='Train' />
        <Box direction='row' gap='medium'>
          <Value label='epoch' value={epoch} />
          <Value label='loss' value={loss} units='mse' />
          <Value label='duration' value={timing} units='ms' />
        </Box>
        <LossHistoryChart history={lossHistory} />
      </Box>
    );
  }
}

export default TrainModel;
