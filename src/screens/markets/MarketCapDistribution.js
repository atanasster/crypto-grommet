import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Distribution } from 'grommet';
import MarketPage from './MarketPage';
import Coin, { FormattedCoinValue } from '../../components/Coin';
import { requestMarketCapDistribution } from '../../actions/market_cap/actions';

class MarketCapDistribution extends Component {
  requestMarketCap(defaultCurrency) {
    this.props.requestMarketCapDistribution({
      currency: defaultCurrency,
    });
  }

  componentDidMount() {
    const { defaultCurrency } = this.props;
    this.requestMarketCap(defaultCurrency);
  }

  componentWillReceiveProps(nextProps) {
    const { defaultCurrency } = nextProps;
    if (defaultCurrency !== this.props.defaultCurrency) {
      this.requestMarketCap(defaultCurrency);
    }
  }

  renderMarket() {
    const { distribution: { tickers }, defaultCurrency } = this.props;
    const values = tickers.map((item, index) => (
      { ...item,
        value: (item[`price_${defaultCurrency.toLowerCase()}`] || item.price_usd) * item.available_supply,
        index }
    ));
    return (
      <Distribution values={values}>
        {(item) => {
          const colors = [
            'brand', 'accent-1', 'accent-2', 'neutral-1', 'neutral-2', 'neutral-3', 'status-ok', 'status-warning',
          ];
          const colorIdx = item.index % colors.length;
          const smallCap = item.index > 4;
          return (
            <Box background={colors[colorIdx]} border='all' fill={true} pad={smallCap ? null : 'small'}>
              <Coin
                level={3}
                symbol={item.symbol}
                toSymbol={defaultCurrency}
                border={null}
                short={smallCap}
              />
              <FormattedCoinValue
                value={item.value}
                large={true}
                level={smallCap ? 4 : 2}
                justify='start'
                toSymbol={defaultCurrency}
              />
            </Box>
          );
        }}
      </Distribution>
    );
  }
  render() {
    return (
      <MarketPage name='Market cap distribution' >
        <Box fill={true} basis='xlarge'>
          {this.renderMarket()}
        </Box>
      </MarketPage>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { requestMarketCapDistribution }, dispatch);

const mapStateToProps = state => ({
  coins: state.coins,
  distribution: state.marketCap.distribution,
  defaultCurrency: state.settings.defaultCurrency,
  defaultExchange: state.settings.defaultExchange,
});


export default connect(mapStateToProps, mapDispatchToProps)(MarketCapDistribution);
