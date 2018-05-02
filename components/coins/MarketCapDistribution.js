import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box, Distribution } from 'grommet';
import { Spinning } from 'grommet-controls';
import Coin, { pushCoinPath } from './Coin';
import { FormattedCoinValue } from '../utils/formatters';
import connect from '../../redux';
import { allCoinsQuery } from '../graphql/coins';


class MarketCapDistribution extends Component {
  onClickBackground = (e, item) => {
    const { currency, exchange } = this.props;
    e.preventDefault();
    pushCoinPath({
      symbol: item.symbol,
      toSymbol: currency,
      exchange,
    });
  };

  render() {
    const { data: { loading, list }, currency, responsive } = this.props;
    if (loading) {
      return (
        <Box full='horizontal' align='center' pad='large'>
          <Spinning />
        </Box>
      );
    }
    const values = list && list.results ? list.results.map((item, index) => (
      {
        ...item,
        value: item.stats.marketCap,
        index,
      }
    )) : [];
    return (
      <Box fill='horizontal' basis='large'>
        <Distribution values={values} style={{ width: '100%' }}>
          {(item) => {
            const colors = [
              'brand', 'accent-1', 'accent-2', 'neutral-1', 'neutral-2', 'neutral-3', 'status-ok', 'status-warning',
            ];
            const colorIdx = item.index % colors.length;
            const smallCap = responsive || item.index > 4;
            return (
              <Box
                background={colors[colorIdx]}
                border='all'
                fill={true}
                pad={smallCap ? null : 'small'}
                onClick={e => this.onClickBackground(e, item)}
              >
                <Coin
                  level={3}
                  coin={item}
                  toCoin={{ symbol: currency }}
                  border={null}
                  short={smallCap}
                />
                <FormattedCoinValue
                  value={item.value}
                  large={true}
                  level={smallCap ? 4 : 2}
                  justify='start'
                  coin={{ symbol: currency }}
                />
              </Box>
            );
          }}
        </Distribution>
      </Box>
    );
  }
}

MarketCapDistribution.propTypes = {
  currency: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  responsive: state.nav.responsive,
});


export default graphql(allCoinsQuery, {
  options: props => ({
    variables: {
      currency: props.currency.toLowerCase(),
      offset: 0,
      limit: 25,
      hasMarketCap: true,
      ordering: '-tickers_coinkeystats.marketCap',
    },
  }),
})(connect(mapStateToProps)(MarketCapDistribution));
