import React from 'react';
import { Text } from 'grommet';
import { PagingTable } from 'grommet-controls';
import { longDate } from 'grommet-controls/utils/moment';
import { loadHistory } from './history';
import LossHistoryChart from './LossHistoryChart';

class ModelHistory extends React.Component {
  onExpand = row => (
    <div>
      {row.original.epochs}
    </div>
  );

  render() {
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
        accessor: 'lossHistory',
        Cell: cell => (
          <LossHistoryChart
            history={cell.value}
            coin={cell.original}
            large={true}
          />
        ),
      },
    ];
    console.log(history);
    return (
      <PagingTable
        columns={columns}
        data={history}
        onExpand={this.onExpand}
        defaultSorted={[{ id: 'date', desc: true }]}
      />
    );
  }
}


export default ModelHistory;

