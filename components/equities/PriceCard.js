import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box, Menu } from 'grommet';
import { Card } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import Equity from './Equity';
import PriceTableStream from './PriceTableStream';
import PriceChart from './PriceChart';
import { equityDetailsQuery } from '../graphql/equities';

const optionLimit = [
  { label: '60 points', value: 60 },
  { label: '100 points', value: 100 },
  { label: '500 points', value: 500 },
  { label: '1000 points', value: 1000 },
  { label: '2000 points', value: 2000 },
];


class PriceCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { points: props.points };
  }

  onSelectPoints = (item) => {
    this.setState({ points: item.value });
  };

  render() {
    const {
      symbol, data: { equity }, color,
    } = this.props;
    if (!equity) {
      return null;
    }
    const { points } = this.state;
    return (
      <Card>
        <CardTitle border='bottom'>
          <Equity equity={equity} size='large' />
        </CardTitle>
        <CardSubTitle border='bottom'>
          IEX Real-Time Price
        </CardSubTitle>
        <CardContent >
          <Box pad='small'>
            <Box>
              <Box justify='between' direction='row'>
                <Menu
                  a11yTitle='Select data points'
                  items={optionLimit.filter(item => (item.value !== points)).map(item => (
                    { value: item.value, label: `${item.value} days`, onClick: () => this.onSelectPoints(item) }
                  ))}
                  label={`${optionLimit.find(p => (p.value === points)).value} days `}
                />
              </Box>
              <PriceChart
                color={color}
                symbol={symbol}
                points={points}
              />
            </Box>
            <PriceTableStream symbol={symbol} />
          </Box>
        </CardContent>
      </Card>
    );
  }
}
PriceCard.defaultProps = {
  symbol: 'AAPL',
  color: undefined,
  points: 60,
};

PriceCard.propTypes = {
  symbol: PropTypes.string,
  points: PropTypes.number,
  color: PropTypes.string,
};


export default graphql(equityDetailsQuery, {
  options: props => (
    { variables: { symbol: props.symbol } }),
})(PriceCard);
