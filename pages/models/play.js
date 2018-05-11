import React from 'react';
import { Box, Heading, Button } from 'grommet';
import App from '../../components/App';
import withData from '../../apollo/withData';
import ModelDesigner from '../../components/deep_learning/Design/ModelDesigner';
import tensorflow from '../../tensorflow/config';
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
          symbol: 'AAPL',
          type: 'equity',
        }],
        lookbackDays: 1,
        dataPoints: 300,
        fillMethod: 'ffill',
        batchSize: 2,
        epochs: 20,
        testSplit: 0.33,
        layers: [
          {
            type: 'Layer',
            config: {
              type: 'LSTM', name: 'LSTM', background: '#1398c6', units: 6,
            },
          },
          {
            type: 'Layer',
            config: {
              type: 'Dense', name: 'Dense', background: '#07c66c', units: 1,
            },
          },
        ],
        optimizer: { type: 'Optimizer', config: { type: 'SGD' } },
        loss: 'meanSquaredError',
        features: [
          { field: 'close', symbol: 'AAPL', type: 'equity' },
          { field: 'volume', symbol: 'AAPL', type: 'equity' },
          { field: 'close', symbol: 'SPY', type: 'equity' },
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
              <Button active={view === 'analysis'} label='analysis' onClick={() => this.setState({ view: 'analysis' })} />
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

