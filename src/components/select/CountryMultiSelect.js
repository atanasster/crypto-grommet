import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Anchor, Box, Button, DropButton, Heading, Text } from 'grommet';
import { FormAdd, FormClose } from 'grommet-icons';
import Flag from '../utils/Flag';
import {
  addSelectedCoutry,
  removeSelectedCoutry,
  clearSelectedCoutries } from '../../actions/countries/actions';
import MultiSelect from '../MultiSelect';


function renderCountry(country, key) {
  return (
    <Box key={key} direction='row' align='center'>
      <Flag
        code={country.code}
        height={12}
      />
      <Text margin={{ horizontal: 'small' }}>{country.name}</Text>
    </Box>
  );
}
class CountryeMultiSelect extends Component {
  state = { open: false, search: '' };

  filter = (query) => {
    this.setState({ open: true, search: query });
  };

  close = () => this.setState({ open: false, search: '' });

  getItems = () => {
    const { search } = this.state;
    const { countries: { all, selected } } = this.props;
    let filtered = [...all];
    if (search) {
      filtered = filtered.filter(c => (c.name.toLowerCase().match(search.toLowerCase())));
    }
    if (selected.length) {
      filtered = filtered.filter(country =>
        selected.findIndex(c => country.code === c.code) === -1);
    }
    return filtered.map(country => (
      renderCountry(country, country.code)
    ));
  };

  select = (country) => {
    this.props.addSelectedCoutry(country.key);
    this.setState({ open: false, search: '' });
  };

  remove = (index) => {
    const { countries: { selected } } = this.props;
    if (index >= 0 && index < selected.length) {
      this.props.removeSelectedCoutry(selected[index].code);
    }
    this.setState({ open: false });
  };

  reset = (event) => {
    event.preventDefault();
    this.props.clearSelectedCoutries();
  };

  render() {
    const { open } = this.state;
    const { countries: { selected } } = this.props;
    let itemNodes;
    if (selected.length) {
      itemNodes = (
        <Box pad={{ vertical: 'small' }}>
          {selected.map((country, index) => (
            <Box align='center' key={country} direction='row' justify='between' pad={{ vertical: 'xsmall' }}>
              {renderCountry(country)}
              <Button
                a11yTitle={`Delete ${country}`}
                plain={true}
                onClick={() => this.remove(index)}
              >
                <Box align='center'>
                  <FormClose />
                </Box>
              </Button>
            </Box>
          ))}
          <Box align='start' margin={{ vertical: 'small' }}>
            <Anchor href='#' onClick={this.reset}>
              Clear Countries
            </Anchor>
          </Box>
        </Box>
      );
    }
    return (
      <Box basis='small'>
        <DropButton
          a11yTitle='Select Countries'
          open={open}
          onClose={this.close}
          control={
            <Box direction='row' justify='between'>
              <Heading level={4} margin='none'><strong>Countries</strong></Heading>
              <FormAdd color='brand' />
            </Box>
          }
        >
          <MultiSelect
            dropSize='medium'
            category='Country'
            onSearch={this.filter}
            onClose={this.close}
            items={this.getItems()}
            onSelect={this.select}
          />
        </DropButton>
        {itemNodes}
      </Box>);
  }
}

// eslint-disable-next-line max-len
const mapDispatchToProps = dispatch => bindActionCreators({
  addSelectedCoutry, removeSelectedCoutry, clearSelectedCoutries,
}, dispatch);

const mapStateToProps = state => ({ countries: state.countries });

export default connect(mapStateToProps, mapDispatchToProps)(CountryeMultiSelect);
