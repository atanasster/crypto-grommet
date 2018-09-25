import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Box, Distribution } from 'grommet';
import { Spinning } from 'grommet-controls';
import { colorFromIndex } from 'grommet-controls/utils';
import Equity, { pushEquityPath } from './Equity';
import { FormattedCoinValue } from '../utils/formatters';
import connect from '../../redux';
import { allEquitiesQuery } from '../../graphql/equities';


class MarketCapDistribution extends Component {
  onClickBackground = (e, item) => {
    e.preventDefault();
    pushEquityPath({
      symbol: item.symbol,
    });
  };

  render() {
    const { data: { loading, list }, responsive } = this.props;
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
            const smallCap = responsive || item.index > 4;
            return (
              <Box
                background={colorFromIndex(item.index)}
                border='all'
                fill={true}
                pad={smallCap ? null : 'small'}
                onClick={e => this.onClickBackground(e, item)}
              >
                <Equity
                  level={4}
                  equity={item}
                  display={smallCap ? ['image'] : undefined}
                />
                <FormattedCoinValue
                  value={item.value}
                  large={true}
                  level={smallCap ? 4 : 2}
                  justify='start'
                />
              </Box>
            );
          }}
        </Distribution>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  responsive: state.nav.responsive,
});


export default graphql(allEquitiesQuery, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 25,
      hasMarketCap: true,
      ordering: '-tickers_keystats.marketCap',
    },
  }),
})(connect(mapStateToProps)(MarketCapDistribution));
