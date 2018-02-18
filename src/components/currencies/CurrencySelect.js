import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Select } from 'grommet';
import { changeDefaultCurrency } from '../../actions/settings/actions';

const availableCurrencies = [
  'USD', 'EUR', 'KRW', 'GBP', 'JPY', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'HKD', 'HUF',
  'IDR', 'ILS', 'INR', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN',
  'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR',
];

class CurrencySelect extends Component {
  onChange = (option) => {
    this.props.changeDefaultCurrency(option);
  };

  render() {
    const { defaultCurrency, basis } = this.props;
    return (
      <Box basis={basis} >
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

CurrencySelect.defaultProps = {
  basis: undefined,
};
CurrencySelect.propTypes = {
  basis: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators({ changeDefaultCurrency }, dispatch);


const mapStateToProps = state => ({
  defaultCurrency: state.settings.defaultCurrency,
  countries: state.countries.all,
});


export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
