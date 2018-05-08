import React from 'react';
import { Box, Button, Text } from 'grommet';
import { PagingTable } from 'grommet-controls';
import { longDate } from 'grommet-controls/utils/moment';
import { loadHistory, clearHistory } from './history';
import LossHistoryChart from './LossHistoryChart';
import Confirmation from '../../grommet-controls/Confirmation/Confirmation';

class ModelHistory extends React.Component {
  state = {
    confirmClearHistory: false,
  }
  onExpand = row => (
    <div>
      {row.original.epochs}
    </div>
  );

  onClearHistory = () => {
    clearHistory();
    this.setState({ confirmClearHistory: false });
  };

  render() {
    const { confirmClearHistory } = this.state;
    let confirmClear;
    if (confirmClearHistory) {
      confirmClear = (
        <Confirmation
          title='Clear history?'
          text='Are you sure you want to clear the model history?'
          onClose={() => this.setState({ confirmClearHistory: false })}
          onConfirm={this.onClearHistory}
        />
      );
    }
    const history = loadHistory();
    const columns = [
      {
        Header: 'Run',
        accessor: 'date',
        Cell: cell => longDate(cell.value),
      },
      {
        Header: 'Loss',
        accessor: 'loss',
        Cell: cell => (<Text weight='bold'>{cell.value.toFixed(5)}</Text>),
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Epochs',
        accessor: 'epochs',
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Batch sze',
        accessor: 'batchSize',
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: 'Timing',
        accessor: 'timing',
        getProps: () => ({ align: 'end' }),
      }, {
        Header: 'Loss',
        accessor: 'history',
        Cell: cell => (
          <LossHistoryChart
            loss={cell.value.loss}
            valLoss={cell.value.val_loss}
          />
        ),
      },
    ];
    return (
      <Box gap='medium' fill='horizontal'>
        <Box alignSelf='end'>
          <Button label='Clear history' onClick={() => this.setState({ confirmClearHistory: true })} />
        </Box>
        <PagingTable
          columns={columns}
          data={history}
          onExpand={this.onExpand}
          defaultSorted={[{ id: 'date', desc: true }]}
        />
        {confirmClear}
      </Box>
    );
  }
}


export default ModelHistory;

