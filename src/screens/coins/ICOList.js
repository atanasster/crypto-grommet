import React, { Component } from 'react';
import { Text } from 'grommet';
import Coin from '../../components/Coin';
import CoinsList from './CoinsList';


export default class ICOList extends Component {
// eslint-disable-next-line class-methods-use-this,no-undef
  filterCoin = coin => coin.ICO && coin.ICO.status !== 'Finished';
  // eslint-disable-next-line class-methods-use-this,no-undef
  columns = (props, rows) => (
    [
      {
        Header: 'Coin',
        accessor: 'coinName',
        Cell: cell => (
          <Coin
            symbol={cell.original.symbol}
            toSymbol={props.defaultCurrency}
            exchange={props.defaultExchange}
            level={4}
            border={null}
          />
        ),
        Footer: cell => (
          <Text>{`${cell.data.length} of ${rows.length} ICOs`}</Text>
        ),
      }, {
        Header: 'Status',
        accessor: 'ICO.status',
      }, {
        Header: 'Features',
        accessor: 'ICO.features',
      }, {
        Header: 'Token type',
        accessor: 'ICO.tokenType',
      }, {
        Header: 'Funding target',
        getProps: () => ({ textAlign: 'end' }),
        accessor: 'ICO.fundingTarget',
      }, {
        Header: 'Funding cap',
        getProps: () => ({ textAlign: 'end' }),
        accessor: 'ICO.fundingCap',
      },
    ]
  );

  render() {
    return (
      <CoinsList
        title='ICOs'
        onFilter={this.filterCoin}
        columns={this.columns}
      />);
  }
}
