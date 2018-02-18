import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Box, Text, Markdown } from 'grommet';
import Page from '../../components/Page';
import Table from '../../components/table/Table';
import Coin from '../../components/Coin';
import PriceCard from './components/PriceCard';
import ICOCard from './components/ICOCard';
import OrderBookCard from './components/OrderBookCard';

class CoinsList extends Component {
  // eslint-disable-next-line no-undef
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
          <Text >{`${cell.data.length} of ${rows.length} coins`}</Text>
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
        getProps: () => ({ textAlign: 'center' }),
        Cell: cell => (cell.value === 0 ? 'Yes' : ''),
      }, {
        Header: 'Pre-mined value',
        accessor: 'preMinedValue',
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: 'Total Coin Supply',
        getProps: () => ({ textAlign: 'end' }),
        accessor: 'totalCoinSupply',
        Cell: cell => (<Text textAlign='right'>{numeral(cell.value).format('0,000')}</Text>),
      }, {
        Header: 'Free float',
        accessor: 'totalCoinsFreeFloat',
        getProps: () => ({ textAlign: 'end' }),
      },
    ]
  );
  onExpand = (row) => {
    if (row.original.ICO) {
      return (
        <Box direction='row' pad='small' justify='between'>
          <Box>
            <Markdown
              content={row.original.ICO.description}
            />
          </Box>
          <ICOCard symbol={row.original.symbol} />
        </Box>
      );
    }
    return (
      <Box direction='row' pad='small'>
        <PriceCard symbol={row.original.symbol} />
        <OrderBookCard symbol={row.original.symbol} />

      </Box>
    );
  };
  renderCoinsList() {
    const { coins: { all: allCoins, loading },
      onFilter, onExpand = this.onExpand,
      columns = this.columns,
    } = this.props;
    const rows = Object.keys(allCoins)
      .filter(key => (onFilter ? onFilter(allCoins[key]) : true))
      .map(key => allCoins[key]);
    return (
      <Table
        loading={loading}
        filterable={true}
        data={rows}
        SubComponent={onExpand}
        columns={columns(this.props, rows)}
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
  onExpand: undefined,
};
CoinsList.propTypes = {
  onFilter: PropTypes.func,
  onExpand: PropTypes.func,
};

export default connect(mapStateToProps)(CoinsList);
