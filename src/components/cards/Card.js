import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text } from 'grommet';


const Card = ({ title, subTitle, children, basis = undefined }) => (
  <Box pad='small' margin={{ vertical: 'small' }} border='all' align='center' basis={basis}>
    <Box direction='row' align='center' >
      {React.isValidElement(title) ? title : (
        <Heading level={2} margin='none'>{title}</Heading>
      )}
    </Box>
    {subTitle ? (
      <Box margin='small' fill='horizontal' align='center'>
        {React.isValidElement(subTitle) ? subTitle :
          (<Text size='medium'><strong>{subTitle}</strong></Text>)
        }
      </Box>
    ) : null}
    <Box pad='small' border='top' fill='horizontal'>
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
