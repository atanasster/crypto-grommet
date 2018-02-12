import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Box, Text,
} from 'grommet';
import { Blank } from 'grommet-icons';

import CountryMultiSelect from '../components/select/CountryMultiSelect';
import ExchangeCard from '../components/ExchangeCard';
import Page from '../components/Page';
import CardScroll from '../components/CardScroll';

class ExchangesList extends Component {
  renderExchanges() {
    const { exchanges: { all }, countries } = this.props;
    const allExchanges = Object.keys(all).map(key => all[key]);
    let filtered = [...allExchanges];
    if (countries.length) {
      filtered = filtered.filter(e =>
        (e.countries.findIndex(code =>
          (countries.findIndex(c => (c.code === code)) !== -1)) !== -1));
    }
    const display =
      filtered.map(exchange => (
        <ExchangeCard key={`exchange_${exchange.id}`} exchange={exchange} />
      ));
    return (
      <Fragment>
        <CardScroll>
          {display}
        </CardScroll>
        <Box
          align='center'
          direction='row'
          tag='footer'
          border='top'
          justify='between'
          pad='small'
        >
          <Blank size='large' />
          <Text>
            <strong>
              {filtered.length === allExchanges.length ? filtered.length : `${filtered.length} of ${allExchanges.length}`}
            </strong> exchanges
          </Text>
          <Blank size='large' />
        </Box>
      </Fragment>
    );
  }

  render() {
    return (
      <Page name='Exchanges'>
        <Box
          align='center'
          direction='row'
          tag='header'
          pad={{ horizontal: 'medium' }}
        >
          <CountryMultiSelect />
        </Box>
        {this.renderExchanges()}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  exchanges: state.exchanges,
  countries: state.countries.selected,
});

export default connect(mapStateToProps)(ExchangesList);
