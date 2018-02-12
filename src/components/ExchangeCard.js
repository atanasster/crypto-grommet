import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor, Text, Paragraph } from 'grommet';
import Exchange, { ExchangeCountries } from './Exchange';
import Card from './Card';

export function renderURLS(url) {
  const urls = typeof url === 'string' ? [url] : url;
  return urls.map(href => (
    <Anchor key={`www_${href}`} href={href}>
      <Text truncate={true}>{href}</Text>
    </Anchor>
  ));
}

export default class ExchangeCard extends Component {
  render() {
    const { exchange } = this.props;
    return (
      <Card
        title={<Exchange exchange={exchange.name} level={2} border={null} />}
        subTitle={(
          <Box direction='row'>
            <ExchangeCountries countries={exchange.countries} />
          </Box>
        )}
        border='top'
      >
        <Paragraph>
          {renderURLS(exchange.url)}
        </Paragraph>
      </Card>
    );
  }
}

ExchangeCard.propTypes = {
  exchange: PropTypes.object.isRequired,
};
