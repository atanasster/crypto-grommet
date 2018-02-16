import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Select } from 'grommet';
import { changeDefaultCurrency } from '../../actions/settings/actions';

const availableCurrencies = [
  'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF',
  'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN',
  'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR',
];

class CurrencySelect extends Component {
  onChange = ({ option }) => {
    this.props.changeDefaultCurrency(option);
  };

  render() {
    const { defaultCurrency } = this.props;
    return (
      <Box basis='small'>
        <Select
          a11yTitle='Change default currency'
          value={defaultCurrency}
          options={availableCurrencies.filter(c => c !== defaultCurrency)}
          onChange={this.onChange}
        />
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ changeDefaultCurrency }, dispatch);


const mapStateToProps = state => ({
  defaultCurrency: state.settings.defaultCurrency,
  countries: state.countries.all,
});


export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
