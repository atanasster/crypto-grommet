import React, { Component } from 'react';
import { Box, Anchor, Paragraph, Heading } from 'grommet';
import Page from '../components/Page';

export default class About extends Component {
  render() {
    return (
      <Page name='About crypto-grommet'>
        <Box>
          <Box margin={{ vertical: 'small' }} >
            <Heading level={1}>
              <strong>Site and source code</strong>
            </Heading>
            <Paragraph size='large'>
              <Anchor label='Financeboards' href='https://financeboards.com' target='_blank' /> - predictive models for all your financial information in configurable dashboards.
            </Paragraph>
          </Box>
          <Box margin={{ vertical: 'small' }} >
            <Heading level={1}>
              <strong>User interface library</strong>
            </Heading>
            <Paragraph size='large'>
              <Anchor label='Grommet v2' href='https://v2.grommet.io/' target='_blank' /> - the most advanced open source UX framework for enterprise applications.
            </Paragraph>
          </Box>
          <Box margin={{ vertical: 'small' }} >
            <Heading level={1}>
              <strong>Crypto REST and socket API</strong>
            </Heading>
            <Paragraph size='large'>
              <Anchor label='CryptoCompare' href=' https://www.cryptocompare.com/api/' target='_blank' /> - interactive platform where you can discuss the latest Crypto trends and monitor all markets streaming in real time.
            </Paragraph>
          </Box>
          <Box margin={{ vertical: 'small' }} >
            <Heading level={1}>
              <strong>Advanced charting</strong>
            </Heading>
            <Paragraph size='large'>
              <Anchor label='Highcharts' href=' http://www.highcharts.com' target='_blank' /> - JavaScript charting library based on SVG, with fallbacks to VML and canvas for old browsers.
            </Paragraph>
          </Box>
          <Box margin={{ vertical: 'small' }} >
            <Heading level={1}>
              <strong>Market exchanges API library</strong>
            </Heading>
            <Paragraph size='large'>
              <Anchor label='CCXT – CryptoCurrency eXchange Trading Library' href=' https://github.com/ccxt/ccxt/wiki' target='_blank' /> - JavaScript / Python / PHP cryptocurrency trading library with support for more than 90 bitcoin/altcoin exchanges.
            </Paragraph>
          </Box>
        </Box>
      </Page>
    );
  }
}

