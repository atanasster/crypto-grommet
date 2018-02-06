import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, Image, Text } from 'grommet';
import Flag from 'react-world-flags';
import ExchangeLayer from './ExchangeLayer';

export function renderURLS(url) {
  const urls = typeof url === 'string' ? [url] : url;
  return urls.map(href => (
    <Anchor key={`www_${href}`} href={href}>
      <Text truncate={true}>{href}</Text>
    </Anchor>
  ));
}

export function renderCountries(countries) {
  return countries.map(code => (
    <Box key={`country_${code}`} margin={{ right: 'xsmall' }} border='all' alignSelf='center'>
      <Flag
        code={code}
        height={12}
      />
    </Box>
  ));
}

export default class Exchange extends Component {
  state = { layer: false };

  render() {
    const { exchange } = this.props;
    const { layer } = this.state;
    return (
      <Box margin={{ bottom: 'xsmall' }} pad='xsmall' align='center'>
        <Button onClick={() => this.setState({ layer: true })}>
          <Box align='center'>
            <Box justify='between' direction='row'>
              {renderCountries(exchange.countries)}
            </Box>
            <strong>{exchange.name}</strong>
            <Image
              src={exchange.logo}
              style={{ maxWidth: '80%', maxHeight: '100%', height: 'auto' }}
            />
          </Box>
        </Button>
        <Box margin={{ top: 'xsmall' }} >
          {renderURLS(exchange.url)}
        </Box>
        {layer ? (<ExchangeLayer
          onClose={() => this.setState({ layer: undefined })}
          exchange={exchange}
        />) : null}
      </Box>
    );
  }
}

Exchange.propTypes = {
  exchange: PropTypes.object.isRequired,
};
