import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, RoutedAnchor, Image, Text } from 'grommet';
import { ExchangeCountries } from './Exchange';

export function renderURLS(url) {
  const urls = typeof url === 'string' ? [url] : url;
  return urls.map(href => (
    <Anchor key={`www_${href}`} href={href}>
      <Text truncate={true}>{href}</Text>
    </Anchor>
  ));
}

export default class Exchange extends Component {
  render() {
    const { exchange } = this.props;
    return (
      <Box margin={{ bottom: 'xsmall' }} pad='xsmall' align='center'>
        <RoutedAnchor path={`/exchanges/${exchange.name}`}>
          <Box align='center'>
            <Box justify='between' direction='row'>
              <ExchangeCountries countries={exchange.countries} />
            </Box>
            <strong>{exchange.name}</strong>
            <Image
              src={exchange.logo}
              style={{ maxWidth: '80%', maxHeight: '100%', height: 'auto' }}
            />
          </Box>
        </RoutedAnchor>
        <Box margin={{ top: 'xsmall' }} >
          {renderURLS(exchange.url)}
        </Box>
      </Box>
    );
  }
}

Exchange.propTypes = {
  exchange: PropTypes.object.isRequired,
};
