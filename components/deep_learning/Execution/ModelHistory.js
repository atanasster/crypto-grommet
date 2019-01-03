import React from 'react';
import { findDOMNode } from 'react-dom';
import * as tfvis from '@tensorflow/tfjs-vis';
import { Box, Button, Text, Anchor } from 'grommet';
import { PagingTable } from 'grommet-controls';
import JSONPretty from 'react-json-pretty';
import LossHistoryChart from './LossHistoryChart';
import Confirmation from '../../grommet-controls/Confirmation/Confirmation';
import { ModelContext } from '../StateProvider';
import Symbol from '../../Symbol';
import { periodToTime, formatTraingTime } from '../utils';
import pushRoute from '../../Router';
import PredictModel from './Predict';
import createTFModel from '../../../tensorflow/run/create_model';

class ModelHistory extends React.Component {
  state = {
    confirmClearHistory: false,
    confirmLoadModel: false,
  };

  onExpand = row => (
    <Box gap='medium'>
      <PredictModel model={row.original} />
      <Box direction='row-responsive' height='large'>
        <Box basis='1/2' >
          <Box
            width='50%'
            fill='vertical'
          >
            <Box>
              <Box background='light-1' pad={{ horizontal: 'small' }} border={{ color: 'light-3', side: 'bottom' }}>
                model summary
              </Box>
              <Box
                ref={(r) => {
                  const container = findDOMNode(r);
                  if (container) {
                    const model = createTFModel(row.original.model, row.original.inputShape);
                    tfvis.show.modelSummary(container, model);
                  }
                }}
                fill='vertical'
              />
            </Box>
          </Box>
        </Box>
        <Box basis='1/2' overflow='scroll'>
          {row.original.tfModel && <JSONPretty json={JSON.parse(row.original.tfModel)} />}
        </Box>
      </Box>
    </Box>
  )

  onClearHistory = (clearHistory) => {
    clearHistory();
    this.setState({ confirmClearHistory: false });
  };

  loadModel = (loadModel) => {
    const { selectedModel: model } = this.state;
    loadModel(model);
    this.setState({ confirmLoadModel: false }, () => pushRoute({ route: 'models_playground' }));
  };

  render() {
    const columns = [
      {
        Header: 'Run',
        accessor: 'date',
        maxWidth: 120,
        Cell: cell => <Text size='small'>{formatTraingTime(cell.value)}</Text>,
      },
      {
        Header: 'Prediction',
        accessor: 'model.lookbackDays',
        maxWidth: 140,
        Cell: cell => (<Text weight='bold'>{cell.value < 2 ? `${cell.value} day` : `${cell.value} days`}</Text>),
      },
      {
        Header: 'Duration',
        accessor: 'timing',
        maxWidth: 90,
        Cell: (cell) => {
          const { time, units } = periodToTime(cell.value);
          return <Text size='small'>{`${time} (${units})`}</Text>;
        },
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Loss',
        accessor: 'loss',
        maxWidth: 120,
        Cell: cell => (<Text weight='bold'>{cell.value ? cell.value.toFixed(5) : '-'}</Text>),
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Val. loss',
        accessor: 'valLoss',
        maxWidth: 120,
        Cell: cell => (<Text weight='bold'>{cell.value ? cell.value.toFixed(5) : '-'}</Text>),
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Epochs',
        accessor: 'model.epochs',
        maxWidth: 70,
        Cell: cell => (<Text weight='bold'>{cell.value}</Text>),
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Batch',
        maxWidth: 70,
        accessor: 'model.batchSize',
        Cell: cell => (<Text weight='bold'>{cell.value}</Text>),
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Features',
        accessor: 'model',
        Cell: cell => (
          <Box direction='row' wrap={true} gap='small'>
            {cell.original.model.features.map((item, index) => (
              <Box align='center' key={`feature_${index}`}>
                <Symbol {...item} disableLink={false} />
                <Text size='small'>{item.field}</Text>
              </Box>
            ))},
          </Box>
        ),
      },
      {
        Header: 'Layers',
        accessor: 'model',
        Cell: cell => (
          <Box direction='row' wrap={true} gap='small'>
            {cell.original.model.layers.map(layer => `${layer.config.type}(${layer.config.units})`)}
          </Box>
        ),
      },
      {
        Header: 'Target',
        accessor: 'model',
        Cell: cell => (
          <Box direction='row' wrap={true} gap='small'>
            {cell.original.model.targets.map((item, index) => (
              <Box align='center' key={`feature_${index}`}>
                <Symbol {...item} disableLink={false} />
                <Text size='small'>{item.field}</Text>
              </Box>
            ))}
          </Box>
        ),
      }, {
        Header: 'Loss',
        accessor: 'history',
        Cell: cell => (
          <LossHistoryChart
            width='100%'
            loss={cell.value.loss}
            valLoss={cell.value.val_loss}
          />
        ),
      }, {
        Header: '',
        sortable: false,
        accessor: 'model',
        maxWidth: 50,
        Cell: cell => (
          <Box align='center' justify='center'>
            <Anchor
              onClick={() => this.setState({ confirmLoadModel: true, selectedModel: cell.value })}
            >
              <Text>
                load
              </Text>
            </Anchor>
          </Box>
        ),
      },
    ];
    return (
      <ModelContext.Consumer>
        {({ history, clearHistory, loadModel }) => {
          const { confirmClearHistory, confirmLoadModel } = this.state;
          let confirmClear;
          if (confirmClearHistory) {
            confirmClear = (
              <Confirmation
                title='Clear history?'
                text='Are you sure you want to clear the model history?'
                onClose={() => this.setState({ confirmClearHistory: false })}
                onConfirm={() => this.onClearHistory(clearHistory)}
              />
            );
          }
          let confirmLoad;
          if (confirmLoadModel) {
            confirmLoad = (
              <Confirmation
                title='Load model?'
                text='Are you sure you want to a model from history and clear the current one?'
                onClose={() => this.setState({ confirmLoadModel: false })}
                onConfirm={() => this.loadModel(loadModel)}
              />
            );
          }
          return (
            <Box gap='medium' fill='horizontal'>
              <Box alignSelf='end'>
                <Button
                  label='Clear history'
                  onClick={() => this.setState({ confirmClearHistory: true })}
                />
              </Box>
              <PagingTable
                columns={columns}
                data={history}
                SubComponent={this.onExpand}
                defaultSorted={[{ id: 'date', desc: true }]}
              />
              {confirmClear}
              {confirmLoad}
            </Box>
          );
        }}
      </ModelContext.Consumer>
    );
  }
}


export default ModelHistory;

