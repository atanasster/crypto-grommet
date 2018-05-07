import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';


const LABEL_SIZE_MAP = {
  xsmall: 'xsmall',
  small: 'xsmall',
  medium: 'xsmall',
  large: 'small',
  xlarge: 'medium',
  xxlarge: 'large',
};
const Value = ({
  label, value, size, weight, gap, units,
}) => (
  <Box gap={gap}>
    <Text size={size} weight={weight}>
      {`${value !== undefined ? value : '-'}${units ? ` ${units}` : ''}`}
    </Text>
    <Box alignSelf='end'>
      <Text size={LABEL_SIZE_MAP[size]}>
        {label}
      </Text>
    </Box>
  </Box>
);

Value.defaultProps = {
  label: undefined,
  value: undefined,
  weight: 'bold',
  gap: 'small',
  size: 'large',
};

Value.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weight: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'bold']), PropTypes.number]),
  gap: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
};


export default Value;
