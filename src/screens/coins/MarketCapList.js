import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box } from 'grommet';
import Page from '../../components/pages/Page';
import Table from '../../components/table/Table';
import Coin, { FormattedCoinValue, ColoredPercentChange } from '../../components/Coin';
import PriceCard from '../../components/cards/PriceCard';
import OrderBookCard from '../../components/cards/OrderBookCard';
import { requestMarketCapTable } from '../../actions/market_cap/actions';

class MarketCapList extends Component {
  start = 0;
  limit = 25;

  requestMarketCapTable(defaultCurrency) {
    this.props.requestMarketCapTable({
      currency: defaultCurrency,
      start: this.start,
      limit: this.limit,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { defaultCurrency } = nextProps;
    if (defaultCurrency !== this.props.defaultCurrency) {
      this.requestMarketCapTable(defaultCurrency);
    }
  }

  onExpand = row => (
    <Box direction='row' pad='small'>
      <PriceCard symbol={row.original.symbol} />
      <OrderBookCard symbol={row.original.symbol} />

    </Box>
  );

  fetchData = ({ pageSize, page }) => {
    const { defaultCurrency } = this.props;
    console.log('request FETCH', pageSize, page);
    this.start = pageSize * page;
    this.limit = this.start + pageSize;
    this.requestMarketCapTable(defaultCurrency);
  };

  renderCoinsList() {
    const { pagingTable: { loading, tickers }, defaultCurrency, defaultExchange } = this.props;
    const columns = [
      {
        Header: 'Rank',
        accessor: 'rank',
        maxWidth: 60,
        getProps: () => ({ textAlign: 'end' }),
      },
      {
        Header: 'Coin',
        accessor: 'coinName',
        Cell: cell => (
          <Coin
            symbol={cell.original.symbol}
            toSymbol={defaultCurrency}
            exchange={defaultExchange}
            level={4}
            border={null}
          />
        ),
      }, {
        Header: `Market cap (${defaultCurrency})`,
        accessor: `price_${defaultCurrency.toLowerCase()}`,
        Cell: cell => (
          <FormattedCoinValue
            value={cell.value * cell.original.available_supply}
            toSymbol={defaultCurrency}
            large={true}
          />
        ),
        getProps: () => ({ align: 'end' }),
      }, {
        Header: `Price (${defaultCurrency})`,
        accessor: `price_${defaultCurrency.toLowerCase()}`,
        maxWidth: 120,
        Cell: cell => (<FormattedCoinValue value={cell.value} toSymbol={defaultCurrency} />),
        getProps: () => ({ align: 'end' }),
      }, {
        Header: '24hr volume',
        accessor: `24h_volume_${defaultCurrency.toLowerCase()}`,
        Cell: cell => (
          <FormattedCoinValue value={cell.value} toSymbol={defaultCurrency} large={true} />
        ),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: '%1hr',
        accessor: 'percent_change_1h',
        maxWidth: 100,
        Cell: cell => (<ColoredPercentChange value={cell.value} />),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: '%24hr',
        accessor: 'percent_change_24h',
        maxWidth: 120,
        Cell: cell => (<ColoredPercentChange value={cell.value} />),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: '%7d',
        accessor: 'percent_change_7d',
        maxWidth: 120,
        Cell: cell => (<ColoredPercentChange value={cell.value} />),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: 'In circulation',
        accessor: 'available_supply',
        Cell: cell => (
          <FormattedCoinValue value={cell.value} toSymbol={cell.original.symbol} large={true} />
        ),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: 'Total',
        accessor: 'total_supply',
        Cell: cell => (
          <FormattedCoinValue value={cell.value} toSymbol={cell.original.symbol} large={true} />
        ),
        getProps: () => ({ textAlign: 'end' }),
      },
    ];
    return (
      <Table
        sortable={false}
        manual={true}
        pages={13}
        loading={loading}
        onFetchData={this.fetchData}
        data={tickers}
        SubComponent={this.onExpand}
        defaultPageSize={this.limit - this.start}
        columns={columns}
      />
    );
  }
  render() {
    return (
      <Page name='Market cap'>
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

const mapDispatchToProps = dispatch => bindActionCreators({ requestMarketCapTable }, dispatch);

const mapStateToProps = state => ({
  coins: state.coins,
  pagingTable: state.marketCap.pagingTable,
  defaultCurrency: state.settings.defaultCurrency,
  defaultExchange: state.settings.defaultExchange,
});


export default connect(mapStateToProps, mapDispatchToProps)(MarketCapList);
