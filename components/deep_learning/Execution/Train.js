import React from 'react';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';
import { Box, Button } from 'grommet';
import Value from '../../grommet-controls/Value/Value';
import LossHistoryChart from './LossHistoryChart';
import { addHistory } from './history';
import { prepareTestTrainData } from '../../../tensorflow/run/data_preparation';
import createTFModel from '../../../tensorflow/run/create_model';
import tensorflow from '../../../tensorflow/config';
// import makePredictions from '../../../tensorflow/predictions';

class TrainModel extends React.Component {
  state = {
    running: false,
    lossHistory: [],
    valLossHistory: [],
  };

  static contextTypes = {
    client: PropTypes.object.isRequired,
  };

  async onTrain() {
    const { model } = this.props;
    this.setState({
      running: true,
      lossHistory: [],
      valLossHistory: [],
      epoch: undefined,
      loss: undefined,
      valLoss: undefined,
    });
    const beginMs = Date.now();
    try {
      const {
        xTrain, yTrain, xTest, yTest, scalers,
      } = await prepareTestTrainData(model);
      const scaler = scalers[scalers.length - 1];
      const tfModel = createTFModel(model);
      const optimizer = tensorflow.createObject(model.optimizer);
      tfModel.compile({
        loss: model.loss,
        optimizer: optimizer.tf(),
      });

      // Train the model using the data.
      const history = await tfModel.fit(xTrain, yTrain, {
        epochs: model.epochs,
        batchSize: model.batchSize,
        validationData: [xTest, yTest],
        callbacks: {
          onTrainBegin: async (logs) => {
            console.log('Training begin', logs);
            await tf.nextFrame();
          },
          onTrainEnd: async (logs) => {
            console.log('Training end', logs);
            await tf.nextFrame();
          },
          onBatchEnd: async () => {
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
        model.layers.forEach((layer, index) => {
          // eslint-disable-next-line no-param-reassign
          layer.weights = [];
          if (history.model.layers.length >= index) {
            const tfLayer = history.model.layers[index + 1];
            tfLayer.weights.forEach((weight) => {
              const data = weight.read()
                .dataSync();
              const { shape } = weight;
              layer.weights.push({ data, shape, name: weight.name });
            });
          }
        });
        const item = {
          model,
          date: Date.now(),
          timing,
          loss: loss[loss.length - 1],
          valLoss: valLoss[valLoss.length - 1],
          history: {
            loss,
            val_loss: valLoss,
          },
          epochs: model.epochs,
          batchSize: model.batchSize,
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
          <Value label='loss (mse)' value={loss ? loss.toFixed(5) : undefined} />
          <Value label='val. loss (mse)' value={valLoss ? valLoss.toFixed(5) : undefined} />
          <Value label='duration (ms)' value={timing} />
        </Box>
        <LossHistoryChart loss={lossHistory} valLoss={valLossHistory} />
      </Box>
    );
  }
}

export default TrainModel;
