import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text } from 'grommet';


const Card = ({ title, subTitle, children }) => (
  <Box pad='small' margin='small' border='all' align='center' >
    <Box direction='row' align='center' >
      {React.isValidElement(title) ? title : (
        <Heading level={2} margin='none'>{title}</Heading>
      )}
    </Box>
    {subTitle ? (
      <Box margin='small' style={{ width: '100%' }} align='center'>
        {React.isValidElement(subTitle) ? subTitle :
          (<Text size='medium'><strong>{subTitle}</strong></Text>)
        }
      </Box>
    ) : null}
    <Box pad='small' border='top' style={{ width: '100%' }}>
      {children}
    </Box>
  </Box>
);

Card.defaultProps = {
  subTitle: undefined,
};

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Card;
