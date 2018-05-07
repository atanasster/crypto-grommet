import React from 'react';
import * as tf from '@tensorflow/tfjs';
import { ResponsiveLine } from '@nivo/line';
import { Box, Button, Text } from 'grommet';


class TrainModel extends React.Component {
  state = {
    running: false,
    lossHistory: [],
  }
  async onTrain() {
    const { model: nn } = this.props;
    const beginMs = Date.now();
    // Generate some synthetic data for training. (y = 2x - 1)
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

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
      callbacks: {
        onTrainBegin: async (logs) => {
          this.setState({ running: true, lossHistory: [] });
          console.log('Training begin', logs);
          await tf.nextFrame();
        },
        onTrainEnd: async (logs) => {
          this.setState({ running: false, timing: (Date.now() - beginMs).toFixed(1) });
          console.log('Training begin', logs);
          await tf.nextFrame();
        },
        onEpochEnd: async (epoch, logs) => {
          if (!Number.isNaN(logs.loss)) {
            const loss = logs.loss.toFixed(5);

            this.setState({
              epoch,
              loss,
              timing: (Date.now() - beginMs).toFixed(1),
              lossHistory: [...this.state.lossHistory, { x: `Epoch ${epoch}`, y: loss }],
            });
          }
          await tf.nextFrame();
        },
      },
    });
    console.log('history', history);
    // Use the model to do inference on a data point the model hasn't seen.
    // Should print approximately 39.
    model.predict(tf.tensor2d([20], [1, 1]))
      .print();
  }
  render() {
    const {
      epoch, loss, running, timing, lossHistory,
    } = this.state;
    return (
      <Box direction='row' align='center' justify='between'>
        <Button onClick={running ? undefined : () => this.onTrain()} label='Train' />
        <Box direction='row'>
          {epoch && <Text>{`Epoch: ${epoch}, loss: ${loss} ${timing && `, time: ${timing} ms`}`}</Text>}
        </Box>
        <div style={{ width: '300px', height: '60px' }} >
          <ResponsiveLine
            data={[{
              id: 'loss',
              color: 'hsl(9, 70%, 50%)',
              data: lossHistory,
            }]}
            minY='auto'
            stacked={true}
            curve='natural'
            enableDots={true}
            dotSize={10}
            dotColor='inherit:darker(0.3)'
            dotBorderWidth={2}
            dotBorderColor='#ffffff'
            enableArea={lossHistory.length > 5}
          />
        </div>
      </Box>
    );
  }
}

export default TrainModel;
