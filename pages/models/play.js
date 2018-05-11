import React from 'react';
import { withRouter } from 'next/router';
import { Box, Heading } from 'grommet';
import App from '../../components/App';
import LinksMenu from '../../components/LinksMenu';
import withData from '../../apollo/withData';
import ModelDesigner from '../../components/deep_learning/Design/ModelDesigner';
import tensorflow from '../../tensorflow/config';
import ModelHistory from '../../components/deep_learning/Execution/ModelHistory';

const playMenu = [
  {
    route: 'models_playground',
    params: {},
    label: 'design',
    a11yTitle: 'Design tensorflow models',
  },
  {
    route: 'models_playground',
    params: { page: 'history' },
    label: 'history',
    a11yTitle: 'History of trained tensorflow models',
  },
  {
    route: 'models_playground',
    params: { page: 'analysis' },
    label: 'analysis',
    a11yTitle: 'Analysis of the last executed model',
  },
];


class TensorFlowPlay extends React.Component {
  constructor() {
    super();
    this.state = {
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
        batchSize: 8,
        epochs: 20,
        testSplit: 0.33,
        layers: [
          {
            type: 'Layer',
            config: {
              type: 'LSTM', name: 'LSTM', background: '#1398c6', units: 4,
            },
          },
          {
            type: 'Layer',
            config: {
              type: 'Dense', name: 'Dense', background: '#07c66c', units: 3,
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
          { field: 'close', symbol: 'MSFT', type: 'equity' },
          { field: 'close', symbol: 'HPQ', type: 'equity' },
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

  renderView(page) {
    const { model } = this.state;
    switch (page) {
      case 'design':
      case undefined:
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
    const { modified } = this.state;
    const { router: { query: { page = 'design' } } } = this.props;
    const title = `Models playground ${modified ? '*' : ''}`;
    return (
      <App
        title={title}
        visibleTitle={(
          <Box direction='row' align='center' justify='between' fill='horizontal'>
            <Heading margin='none' level={1}>
              <strong>{title}</strong>
            </Heading>
            <LinksMenu
              items={playMenu}
              activeItem={playMenu.findIndex(item => item.label === page)}
            />
          </Box>
        )}
      >
        {this.renderView(page)}
      </App>
    );
  }
}

export default withRouter(withData(TensorFlowPlay));

