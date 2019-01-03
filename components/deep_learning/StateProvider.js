import React from 'react';
import * as tf from '@tensorflow/tfjs/dist/index';

const DEFAULT_STATE = {
  history: [],
  modified: false,
  lastTrained: undefined,
  model: {
    id: 0,
    name: 'Apple price prediction',
    targets: [{
      field: 'close',
      symbol: 'AAPL',
      type: 'equity',
    }],
    lookbackDays: 30,
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

export const ModelContext = React.createContext(DEFAULT_STATE);

const HISTORY_STORAGE_NAME = 'LOCAL_MODEL_DATA';

export default class Provider extends React.Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    if (localStorage) {
      const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_NAME)) || [];
      const lastTrained = history.length > 0 ? history[history.length - 1] : undefined;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ history, lastTrained });
    }
    // http://jsfiddle.net/jlubean/dL5cLjxt/
    // eslint-disable-next-line react/no-did-mount-set-state
    if (!!navigator.userAgent.match(/Version\/[\d]+.*Safari/) ||
       (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)) {
      tf.setBackend('cpu');
      console.log('scaling down to cpu backend');
    }
  }
  addToHistory = (newHistory) => {
    const history = [...this.state.history.slice(Math.max(0, this.state.history.length - 99)),
      newHistory,
    ];
    this.setState({ history, lastTrained: newHistory });
    if (localStorage) {
      localStorage.setItem(HISTORY_STORAGE_NAME, JSON.stringify(history));
    }
  };

  updateModel = (propName, value) => {
    this.setState({ model: { ...this.state.model, [propName]: value } });
  };

  loadModel = (model) => {
    this.setState({ model });
  };

  clearHistory = () => {
    this.setState({ history: [], lastTrained: undefined });
    if (localStorage) {
      localStorage.removeItem(HISTORY_STORAGE_NAME);
    }
  };

  render() {
    return (
      <ModelContext.Provider
        value={{
          ...this.state,
          addToHistory: this.addToHistory,
          clearHistory: this.clearHistory,
          updateModel: this.updateModel,
          loadModel: this.loadModel,
        }}
      >
        {this.props.children}
      </ModelContext.Provider>
    );
  }
}
