import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Box, Heading, Text } from 'grommet';

export const valueToColor = (value) => {
  if (value > 0) {
    return 'status-ok';
  } else if (value < 0) {
    return 'status-critical';
  }
  return 'status-warning';
};

export const PercentValue = ({
  value, decimals = 2, ...rest
}) => (
  <Text weight='bold' {...rest} >
    {numeral(value).format(`0,0.${'0'.repeat(decimals)}%`)}
  </Text>
);

export const LargeValue = ({
  value, ...rest
}) => (
  <Text weight='bold' {...rest} >
    {numeral(value).format('a')}
  </Text>
);


export const ColoredPercentChange = ({ value }) => (
  <PercentValue
    value={value}
    color={valueToColor(value)}
  />
);


export const FormattedCoinValue = ({
  value, toSymbol, coin, large, justify, level,
}) => {
  let format = (coin && coin.name && !large) ? '0,0.0000' : '0,0.00';
  if (large) {
    format = `${format}a`;
  }
  return (
    <Box direction='row' align='baseline' gap='xsmall' justify={justify}>
      <Heading margin='none' level={level}>
        {numeral(value).format(format)}
      </Heading>
      <Text size='xsmall'>
        {toSymbol}
      </Text>

    </Box>
  );
};

FormattedCoinValue.defaultProps = {
  large: false,
  justify: 'end',
  level: 4,
  coin: undefined,
  value: undefined,
};

FormattedCoinValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  coin: PropTypes.object,
  large: PropTypes.bool,
  justify: PropTypes.string,
  level: PropTypes.number,
};

if (!String.prototype.repeat) {
  console.log('no repeat');
  String.prototype.repeat = (c) => {
    if (this == null) {
      throw new TypeError(`can't convert ${this} to object`);
    }
    const str = `${this}`;
    let count = +c;
    if (!count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count === Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length === 0 || count === 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    // eslint-disable-next-line no-bitwise
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    let rpt = '';
    for (let i = 0; i < count; i += 0) {
      rpt += str;
    }
    return rpt;
  };
}
