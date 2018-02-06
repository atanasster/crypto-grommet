import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button, Stack,
} from 'grommet';

import { FormCheckmark } from 'grommet-icons';

export default class Selection extends Component {
  static defaultProps = {
    selected: undefined,
  }
  static propTypes = {
    selected: PropTypes.array,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: props.selected || [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && nextProps.selected !== this.state.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }
  notifyChange = () => {
    const { selected } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      onChange(selected);
    }
  }
  onIndexChange = (index) => {
    const { selected } = this.state;
    let newSelection = [...selected];
    if (newSelection.indexOf(index) >= 0) {
      newSelection.splice(newSelection.indexOf(index), 1);
    } else {
      newSelection.push(index);
    }
    newSelection = newSelection.sort();
    this.setState({ selected: newSelection }, this.notifyChange);
  }
  render() {
    const { children, margin, overlay } = this.props;
    const { selected } = this.state;
    return (
      Children.toArray(children).map((child, index) => (
        <Button key={`selection_${index}`} onClick={() => this.onIndexChange(index)}>
          <Stack anchor='fill'>
            {child}
            {selected.indexOf(index) >= 0 ? (
              (overlay && (typeof overlay === 'function' && overlay(child, index))) || overlay || (
                <Box
                  flex='grow'
                  align='end'
                  background={{ color: 'black', opacity: 'medium' }}
                  justify='end'
                  pad='xsmall'
                  margin={margin}
                >
                  <Box
                    align='center'
                    justify='center'
                    background={{ color: 'status-ok' }}
                    round='full'
                    style={{ width: '24px', height: '24px' }}
                  >
                    <FormCheckmark color='white' />
                  </Box>
                </Box>
              )
            ) : undefined}
          </Stack>
        </Button>
      ))
    );
  }
}
