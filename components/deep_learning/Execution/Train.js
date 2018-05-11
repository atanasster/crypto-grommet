import React from 'react';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';
import { Box, Button, Text } from 'grommet';
import Value from '../../grommet-controls/Value/Value';
import LossHistoryChart from './LossHistoryChart';
import { addHistory } from './history';
import { prepareTestTrainData } from '../../../tensorflow/run/data_preparation';
import createTFModel from '../../../tensorflow/run/create_model';
import tensorflow from '../../../tensorflow/config';
import periodToTime from './utils';

class TrainModel extends React.Component {
  state = {
    // eslint-disable-next-line no-undef
    safari: process.browser && (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; }(!window.safari || (typeof safari !== 'undefined' && safari.pushNotification)))),
    running: false,
    lossHistory: [],
    valLossHistory: [],
  };

  static contextTypes = {
    client: PropTypes.object.isRequired,
  };

  updateStatus = (status) => {
    this.setState({ status: `${status}...` });
  };

  async onTrain() {
    const { model } = this.props;
    this.setState({
      timing: undefined,
      status: undefined,
      running: true,
      lossHistory: [],
      valLossHistory: [],
      epoch: undefined,
      loss: undefined,
      valLoss: undefined,
    });
    if (this.state.safari) {
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
      let xTrainR;
      let xTestR;
      if (model.layers.length > 0 && ['LSTM', 'GRU', 'SimpleRNN']
        .indexOf(model.layers[0].config.type) !== -1) {
        xTrainR = xTrain.reshape([xTrain.shape[0], xTrain.shape[1], 1]);
        xTestR = xTest.reshape([xTest.shape[0], xTest.shape[1], 1]);
      } else {
        xTrainR = xTrain;
        xTestR = xTest;
      }
      console.log('data shape:', xTrainR.shape, yTrain.shape, xTestR.shape, yTest.shape);
      const scaler = scalers[scalers.length - 1];
      const tfModel = createTFModel(model, xTrainR.shape.slice(1));
      const optimizer = tensorflow.createObject(model.optimizer);
      tfModel.compile({
        loss: model.loss,
        optimizer: optimizer.tf(),
      });

      // Train the model using the data.
      const history = await tfModel.fit(xTrainR, yTrain, {
        epochs: model.epochs,
        batchSize: model.batchSize,
        validationData: [xTestR, yTest],
        callbacks: {
          onTrainBegin: async () => {
            this.updateStatus('training started');
            await tf.nextFrame();
          },
          onTrainEnd: async () => {
            this.updateStatus('training end');
            await tf.nextFrame();
          },
          onBatchEnd: async () => {
            // give time for UI to update
            await tf.nextFrame();
          },

          onEpochEnd: async (epoch, logs) => {
            if (!Number.isNaN(logs.loss)) {
              // eslint-disable-next-line camelcase
              const { loss, val_loss: valLoss } = logs;
              const scaledLoss = loss / scaler;
              const scaledValLoss = valLoss / scaler;
              this.setState({
                epoch,
                loss: scaledLoss,
                valLoss: scaledValLoss,
                timing: (Date.now() - beginMs).toFixed(0),
                lossHistory: [...this.state.lossHistory, scaledLoss],
                valLossHistory: [...this.state.valLossHistory, scaledValLoss],
              });
            }
            await tf.nextFrame();
          },
        },
      });
      model.scalers = scalers;
      const timing = (Date.now() - beginMs).toFixed(0);
      if (history.history.loss.length > 0) {
        const loss = history.history.loss.map(v => v / scaler);
        const valLoss = history.history.val_loss.map(v => v / scaler);
        const savedLayers = model.layers.map((layer, index) => {
          // eslint-disable-next-line no-param-reassign
          const weights = [];
          if (history.model.layers.length >= index) {
            const tfLayer = history.model.layers[index + 1];
            tfLayer.weights.forEach((weight) => {
              const data = weight.read()
                .dataSync();
              const { shape } = weight;
              weights.push({ data, shape, name: weight.name });
            });
          }
          return { ...layer, weights };
        });
        const item = {
          tfModel: JSON.stringify(history.model.getConfig()),
          model: { ...model, layers: savedLayers },
          date: Date.now(),
          timing,
          loss: loss[loss.length - 1],
          valLoss: valLoss[valLoss.length - 1],
          history: {
            loss,
            val_loss: valLoss,
          },
        };
        addHistory(item);
      }
      // const preditions = await makePredictions(model);
    } finally {
      const timing = (Date.now() - beginMs).toFixed(0);
      this.setState({ running: false, timing });
    }
  }
  render() {
    const {
      epoch, loss, valLoss, running, timing, lossHistory, valLossHistory, status,
    } = this.state;
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
          <Button onClick={running ? undefined : () => this.onTrain()} label='train' />
          <Text>{status}</Text>
        </Box>
        <Box direction='row' gap='medium'>
          <Value label='epoch' value={epoch} />
          <Value label='loss (mse)' value={loss ? loss.toFixed(5) : undefined} />
          <Value label='val. loss (mse)' value={valLoss ? valLoss.toFixed(5) : undefined} />
          <Value label={`duration (${units})`} value={time} />
        </Box>
        <LossHistoryChart loss={lossHistory} valLoss={valLossHistory} />
      </Box>
    );
  }
}

export default TrainModel;
