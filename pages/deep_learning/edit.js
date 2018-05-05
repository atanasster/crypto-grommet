import React from 'react';
import { Box, Heading, FormField } from 'grommet';
import { NumberInput, Form } from 'grommet-controls';
import App from '../../components/App';
import withData from '../../apollo/withData';
import DeepNetwork from '../../components/deep_learning/DeepNetwork/DeepNetwork';
import LayerOptimizer from '../../components/deep_learning/DeepNetwork/properties/LayerOptimizer';
import { optimizersList } from '../../components/deep_learning/DeepNetwork/properties/PropLists';
import kerasDefaults, { createLayer } from '../../components/deep_learning/keras-defaults';
import TrainModel from '../../components/deep_learning/Execution/Train';

class EditNetwork extends React.Component {
  constructor() {
    super();
    this.state = {
      modified: undefined,
      model: {
        id: 0,
        name: 'New Model',
        // categories: [{ id: 1, name: 'Price' }],
        targets: [{
          fieldName: 'close',
          symbol: 'BTC',
          entity: 'coin',
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
        optimizerClass: 'Adam',
        optimizerConfig: {
          lr: 0.001, beta_1: 0.9, beta_2: 0.999, decay: 0, epsilon: 0.0000001,
        },
        objoptimizerClassectif: 'mean_squared_error',
        features: [
          { fieldName: 'open', symbol: 'BTC', entity: 'coin' },
          { fieldName: 'high', symbol: 'BTC', entity: 'coin' },
          { fieldName: 'low', symbol: 'BTC', entity: 'coin' },
          { fieldName: 'close', symbol: 'BTC', entity: 'coin' },
          { fieldName: 'volume', symbol: 'BTC', entity: 'coin' },
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
  onOptimizerChange = (name, optimizer) => {
    this.setState({
      modified: true,
      model: {
        ...this.state.model,
        optimizerClass: optimizer.className,
        optimizerConfig: optimizer.config,
      },
    });
  }

  render() {
    const { model, modified } = this.state;
    return (
      <App
        title={`Deep learning ${modified ? '*' : ''}`}
        menu={<TrainModel model={model} />}
      >
        <Box gap='small' fill='horizontal'>
          <Box primary={true} style={{ width: '100%' }}>
            <Box direction='row-responsive'>
              <Box basis='1/3' pad='medium'>
                <Heading level={3}>Parameters</Heading>
                <Form pad={{ vertical: 'medium' }}>
                  <FormField label='Observation days / window' htmlFor='observation_days'>
                    <NumberInput
                      id='observation_days'
                      min={1}
                      max={25}
                      name='observation_days'
                      value={model.observationDays}
                      onChange={e => this.onChange('observationDays', e)}
                    />
                  </FormField>
                  <FormField label='Batch size' htmlFor='batch_size'>
                    <NumberInput
                      id='batch_size'
                      min={1}
                      max={30}
                      name='batch_size'
                      value={model.batchSize}
                      onChange={e => this.onChange('batchSize', e)}
                    />
                  </FormField>
                  <FormField label='Epochs' htmlFor='epochs'>
                    <NumberInput
                      id='epochs'
                      min={1}
                      max={100}
                      name='epochs'
                      value={model.epochs}
                      onChange={e => this.onChange('epochs', e)}
                    />
                  </FormField>
                  <LayerOptimizer
                    label='Optimizer'
                    name='optimizer'
                    options={optimizersList}
                    defaults={kerasDefaults.optimizers}
                    kerasDefaults={kerasDefaults}
                    value={{ className: model.optimizerClass, config: model.optimizerConfig }}
                    onUpdateValue={this.onOptimizerChange}
                  />
                </Form>
              </Box>
              <DeepNetwork
                editable={true}
                model={model}
                kerasDefaults={kerasDefaults}
                onChange={(updated) => { this.setState({ model: updated }); }}
              />
            </Box>
          </Box>

        </Box>
      </App>
    );
  }
}

export default withData(EditNetwork);

