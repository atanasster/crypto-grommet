import React from 'react';
import { Box, Heading, Button } from 'grommet';
import App from '../../components/App';
import withData from '../../apollo/withData';
import ModelDesigner from '../../components/deep_learning/DeepNetwork/ModelDesigner';
import kerasDefaults, { createLayer } from '../../components/deep_learning/keras-defaults';
import tensorflow from '../../tensorflow';
import ModelHistory from '../../components/deep_learning/Execution/ModelHistory';

class TensorFlowPlay extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'design',
      modified: undefined,
      model: {
        id: 0,
        name: 'New Model',
        // categories: [{ id: 1, name: 'Price' }],
        targets: [{
          field: 'close',
          symbol: 'BTC',
          type: 'coin',
        }],
        lookback_days: 1,
        dataPeriod: '3month',
        fillMethod: 'ffill',
        batchSize: 2,
        epochs: 20,
        observationDays: 1,
        layers: [
          createLayer(kerasDefaults.layers, 'LSTM', { units: 6 }),
          createLayer(kerasDefaults.layers, 'Dense', { units: 3 }),
        ],
        optimizer: tensorflow.optimizer({ name: 'SGD', config: { lr: 0.003 } }),
        loss: 'meanSquaredError',
        features: [
          { field: 'open', symbol: 'BTC', type: 'coin' },
          { field: 'high', symbol: 'BTC', type: 'coin' },
          { field: 'low', symbol: 'BTC', type: 'coin' },
          { field: 'close', symbol: 'BTC', type: 'coin' },
          { field: 'volume', symbol: 'BTC', type: 'coin' },
        ],
      },
    };
  }

  onChange = (id, { target }) => {
    this.setState({
      modified: true,
      model: {
        ...this.state.model,
        [id]: target.value,
      },
    });
  }
  onOptimizerChange = (value, config) => {
    console.log(value);
    this.setState({
      modified: true,
      model: {
        ...this.state.model,
        optimizer: tensorflow.optimizer({ name: value, config }),
      },
    });
  };

  renderView() {
    const { model, view } = this.state;
    switch (view) {
      case 'design':
        return (
          <ModelDesigner
            readOnly={false}
            model={model}
            kerasDefaults={kerasDefaults}
            onChange={(updated) => { this.setState({ model: updated }); }}
          />
        );
      case 'history':
        return <ModelHistory />;
      default:
        return null;
    }
  }

  render() {
    const { modified, view } = this.state;
    const title = `Models playground ${modified ? '*' : ''}`;
    return (
      <App
        title={title}
        visibleTitle={(
          <Box direction='row' align='center' justify='between' fill='horizontal'>
            <Heading margin='none' level={1}>
              <strong>{title}</strong>
            </Heading>
            <Box direction='row' gap='small'>
              <Button active={view === 'design'} label='design' onClick={() => this.setState({ view: 'design' })} />
              <Button active={view === 'history'} label='history' onClick={() => this.setState({ view: 'history' })} />
              <Button active={view === 'predictions'} label='predictions' onClick={() => this.setState({ view: 'predictions' })} />
            </Box>
          </Box>
        )}
      >
        {this.renderView()}
      </App>
    );
  }
}

export default withData(TensorFlowPlay);

