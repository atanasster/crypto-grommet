import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withTheme } from 'grommet/components/hocs';
import StyledTable from './StyledTable';

class Table extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
  };

  render() {
    const { theme, ...rest } = this.props;
    const { grommet } = this.context;


    return (
      <StyledTable
        {...rest}
        theme={theme}
        grommet={grommet}
      />
    );
  }
}

export default compose(withTheme)(Table);
