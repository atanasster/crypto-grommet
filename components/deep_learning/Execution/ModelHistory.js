import React from 'react';
import { Box, Button, Text } from 'grommet';
import { PagingTable } from 'grommet-controls';
import JSONPretty from 'react-json-pretty';
import LossHistoryChart from './LossHistoryChart';
import Confirmation from '../../grommet-controls/Confirmation/Confirmation';
import { ModelContext } from '../StateProvider';
import Symbol from '../../Symbol';
import { periodToTime, formatTraingTime } from '../utils';


class ModelHistory extends React.Component {
  state = {
    confirmClearHistory: false,
  };

  onExpand = row => (
    <Box>
      {row.original.tfModel && <JSONPretty json={JSON.parse(row.original.tfModel)} />}
    </Box>
  );

  onClearHistory = (clearHistory) => {
    clearHistory();
    this.setState({ confirmClearHistory: false });
  };

  render() {
    return (
      <ModelContext.Consumer>
        {({ history, clearHistory }) => {
          const { confirmClearHistory } = this.state;
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
          const columns = [
            {
              Header: 'Run',
              accessor: 'date',
              maxWidth: 140,
              Cell: cell => formatTraingTime(cell.value),
            },
            {
              Header: 'Prediction',
              accessor: 'model.lookbackDays',
              maxWidth: 140,
              Cell: cell => (cell.value < 2 ? `${cell.value} day` : `${cell.value} days`),
            },
            {
              Header: 'Duration',
              accessor: 'timing',
              maxWidth: 110,
              Cell: (cell) => {
                const { time, units } = periodToTime(cell.value);
                return `${time} (${units})`;
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
              maxWidth: 80,
              getProps: () => ({ align: 'end' }),
            },
            {
              Header: 'Batch',
              maxWidth: 80,
              accessor: 'model.batchSize',
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
            },
          ];
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
            </Box>
          );
        }}
      </ModelContext.Consumer>
    );
  }
}


export default ModelHistory;

