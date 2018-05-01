import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import { Card } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import Equitity from './Equitity';
import PriceTableStream from './PriceTableStream';
// import PriceChart from './PriceChart';
import { equityDetailsQuery } from '../graphql/equities';


class PriceCard extends Component {
  render() {
    const {
      symbol, data: { equity },
    } = this.props;
    if (!equity) {
      return null;
    }
    // const { period, points } = this.state;
    return (
      <Card>
        <CardTitle border='bottom'>
          <Equitity equity={equity} border='bottom' />
        </CardTitle>
        <CardSubTitle border='bottom'>
          Data from IEX
        </CardSubTitle>
        <CardContent >
          <Box pad='small'>
            <PriceTableStream symbol={symbol} />
          </Box>
        </CardContent>
      </Card>
    );
  }
}
PriceCard.defaultProps = {
  symbol: 'AAPL',

};

PriceCard.propTypes = {
  symbol: PropTypes.string,
};


export default graphql(equityDetailsQuery, {
  options: props => (
    { variables: { symbol: props.symbol } }),
})(PriceCard);
