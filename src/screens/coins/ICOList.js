import React, { Component } from 'react';
import Coin from '../../components/Coin';
import CoinsList from './CoinsList';


export default class ICOList extends Component {
// eslint-disable-next-line class-methods-use-this,no-undef
  filterCoin = coin => coin.ICO && coin.ICO.status !== 'Finished';
  // eslint-disable-next-line class-methods-use-this,no-undef
  columns = props => (
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
      }, {
        Header: 'Status',
        accessor: 'ICO.status',
      }, {
        Header: 'Features',
        accessor: 'ICO.features',
      }, {
        Header: 'Funding target',
        accessor: 'ICO.fundingTarget',
      }, {
        Header: 'Funding cap',
        accessor: 'ICO.fundingCap',
      },
    ]
  );

  render() {
    return (
      <CoinsList
        title='ICO'
        onFilter={this.filterCoin}
        columns={this.columns}
      />);
  }
}
