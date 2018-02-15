import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Box, Text } from 'grommet';
import Page from '../../components/pages/Page';
import Table from '../../components/table/Table';
import Coin from '../../components/Coin';

class CoinsList extends Component {
  // eslint-disable-next-line no-undef
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
        Header: 'Algo',
        accessor: 'algorithm',
      }, {
        Header: 'Proof',
        accessor: 'proofType',
      }, {
        Header: 'Pre-mined',
        accessor: 'fullyPremined',
        Cell: cell => (cell.value === 0 ? 'Yes' : ''),
      }, {
        Header: 'Pre-mined value',
        accessor: 'preMinedValue',
      }, {
        Header: 'Total Coin Supply',
        accessor: 'totalCoinSupply',
        Cell: cell => (<Text textAlign='right'>{numeral(cell.value).format('0,000')}</Text>),
      }, {
        Header: 'Free float',
        accessor: 'totalCoinsFreeFloat',
      },
    ]
  );

  renderCoinsList() {
    const { coins: { all: allCoins }, onFilter, columns = this.columns } = this.props;
    const rows = Object.keys(allCoins)
      .filter(key => (onFilter ? onFilter(allCoins[key]) : true))
      .map(key => allCoins[key]);
    console.log(rows);
    return (
      <Table
        filterable={true}
        data={rows}
        columns={columns(this.props)}
        defaultSorted={[{ id: 'symbol' }]}
      />
    );
  }
  render() {
    const { title = 'Coins' } = this.props;
    return (
      <Page name={title}>
        <Box
          align='center'
          direction='row'
          tag='header'
          pad={{ horizontal: 'medium' }}
        >
          {this.renderCoinsList()}
        </Box>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  coins: state.coins,
  defaultCurrency: state.settings.defaultCurrency,
  defaultExchange: state.settings.defaultExchange,
});

CoinsList.defaultProps = {
  onFilter: undefined,
};
CoinsList.propTypes = {
  onFilter: PropTypes.func,
};

export default connect(mapStateToProps)(CoinsList);
