import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Select, Text, Heading } from 'grommet';
import SideLayer from '../SideLayer';
import SearchEntity from '../entities/SearchEntity';
import Symbol from '../Symbol';

const fields = {
  open: 'Open price',
  high: 'High price',
  low: 'Low price',
  close: 'Close price',
  volume: 'Volume',
};
class SelectDataset extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = { data };
  }
  onConfirm = () => {
    const { onSelect } = this.props;
    onSelect(this.state.data);
  };

  onSearchSelect = ({ entity, type }) => {
    const { data } = this.state;
    const { slug: symbol } = entity;
    this.setState({ data: { ...data, type, symbol } });
  };

  onSelectField = ({ value }) => {
    const field = Object.keys(fields).find(f => fields[f] === value);
    const { data } = this.state;
    this.setState({ data: { ...data, field } });
  };

  render() {
    const {
      onClose, heading, onRemove,
    } = this.props;
    const { data: { symbol, field, type } } = this.state;
    return (
      <SideLayer onClose={onClose} heading={heading}>
        <Box gap='large'>
          <Box pad={{ vertical: 'small' }} gap='medium'>
            <Box gap='small'>
              <SearchEntity
                value={symbol}
                onChange={this.onSearchSelect}
              />
            </Box>
            <Select
              options={Object.keys(fields).map(key => fields[key])}
              onChange={this.onSelectField}
              value={fields[field] || ''}
            />
          </Box>
          <Box borer='top'>
            <Box align='center' gap='small'>
              <Heading level={3}>
                Selected <strong>{type}</strong>
              </Heading>
              <Symbol
                display={['image', 'symbol', 'name']}
                symbol={symbol}
                type={type}
              />
              <Text weight='bold'>{field}</Text>
            </Box>
            <Box direction='row' justify='between' pad='medium'>
              <Button label='Select' onClick={symbol && field && type ? this.onConfirm : undefined} />
              {onRemove && <Button label='Remove' onClick={onRemove} />}

            </Box>
          </Box>
        </Box>
      </SideLayer>
    );
  }
}

SelectDataset.defaultProps = {
  onRemove: undefined,
  data: undefined,
};

SelectDataset.propTypes = {
  onRemove: PropTypes.func,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default SelectDataset;
