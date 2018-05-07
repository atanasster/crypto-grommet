import React from 'react';
import { PagingTable } from 'grommet-controls';
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
        accessor: 'loss',
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
        ordering={[{ id: 'timing', desc: true }]}
      />
    );
  }
}


export default ModelHistory;

