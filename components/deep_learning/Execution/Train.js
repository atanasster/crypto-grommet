import React from 'react';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';
import { Box, Button } from 'grommet';
import Value from '../../grommet-controls/Value/Value';
import LossHistoryChart from './LossHistoryChart';
import { addHistory } from './history';
import { loadData } from '../../../tensorflow/data_preparation';

class TrainModel extends React.Component {
  state = {
    running: false,
    lossHistory: [],
    valLossHistory: [],
  }
  static contextTypes = {
    client: PropTypes.object.isRequired,
  }
  async onTrain() {
    const { model: nn } = this.props;
    const [xTrain, yTrain, xTest, yTest] = await loadData(nn.features, nn.targets);
    const beginMs = Date.now();
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [xTrain.shape[1]] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({
      loss: nn.loss,
      optimizer: nn.optimizer.tf(),
    });

    // Train the model using the data.
    const history = await model.fit(xTrain, yTrain, {
      epochs: nn.epochs,
      batchSize: nn.batchSize,
      validationData: [xTest, yTest],
      callbacks: {
        onTrainBegin: async (logs) => {
          this.setState({ running: true, lossHistory: [], valLossHistory: [] });
          console.log('Training begin', logs);
          await tf.nextFrame();
        },
        onTrainEnd: async (logs) => {
          console.log('Training end', logs);
          await tf.nextFrame();
        },
        onEpochEnd: async (epoch, logs) => {
          if (!Number.isNaN(logs.loss)) {
            // eslint-disable-next-line camelcase
            const { loss, val_loss: valLoss } = logs;
            this.setState({
              epoch,
              loss,
              valLoss,
              timing: (Date.now() - beginMs).toFixed(0),
              lossHistory: [...this.state.lossHistory, loss],
              valLossHistory: [...this.state.valLossHistory, valLoss],
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
        valLoss: history.history.val_loss[history.history.val_loss.length - 1],
        history: history.history,
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
      epoch, loss, valLoss, running, timing, lossHistory, valLossHistory,
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
          <Value label='loss' value={loss ? loss.toFixed(5) : undefined} units='mse' />
          <Value label='val. loss' value={valLoss ? valLoss.toFixed(5) : undefined} units='mse' />
          <Value label='duration' value={timing} units='ms' />
        </Box>
        <LossHistoryChart loss={lossHistory} valLoss={valLossHistory} />
      </Box>
    );
  }
}

export default TrainModel;
