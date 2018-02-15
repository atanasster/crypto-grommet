import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled from 'styled-components';
import classnames from 'classnames';
import { Box, TextInput } from 'grommet';
import { withTheme } from 'grommet/components/hocs';
import { LinkDown, LinkUp } from 'grommet-icons';
import StyledTable from './StyledTable';
import PaginationComponent from './Pagination';

const TableComponent = ({ children, className, ...rest }) => (
  <div
    className={classnames('rt-table', className)}
    role='grid'
    // tabIndex='0'
    {...rest}
  >
    {children}
  </div>
);

const TrComponent = ({ children, className, ...rest }) => (
  <div
    className={classnames('rt-tr', className)}
    role='row'
    {...rest}
  >
    {children}
  </div>
);

const ThComponent = ({ toggleSort, className, children, ...rest }) => {
  const sortAsc = className.indexOf('-sort-asc') !== -1;
  const sortDesc = className.indexOf('-sort-desc') !== -1;
  let content;
  if (sortAsc || sortDesc) {
    const Sort = sortAsc ? LinkUp : LinkDown;
    content = (
      <Box direction='row' align='center' justify='start' style={{ width: '100%' }}>
        <span>{children}</span>
        <Sort style={{ marginLeft: '5px' }} />
      </Box>
    );
  } else {
    content = children;
  }
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      className={classnames('rt-th', className)}
      onClick={e => (toggleSort && toggleSort(e))}
      role='columnheader'
      {...rest}
    >
      {content}
    </div>
  );
};

const NoDataComponent = ({ children, ...rest }) => (
  <Box {...rest} align='center' pad='small'>
    {children}
  </Box>
);

const FilterComponent = (props) => {
  const { filter, onChange, column } = props;
  return (
    <TextInput
      aria-label={`Filter data by ${typeof column.Header === 'string' ? column.Header : column.id}`}
      style={{ width: '100%' }}
      value={filter ? filter.value : ''}
      onChange={event => onChange(event.target.value)}
    />);
};

const TdBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  display:  block; 
`;

const TdComponent = ({ toggleSort, className, children, ...rest }) => (
  <TdBox
    pad='small'
    role='gridcell'
    {...rest}
  >
    {children}
  </TdBox>
);
class Table extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
  };

  // eslint-disable-next-line no-unused-vars
  static defaultFilter(filter, row, column) {
    const id = filter.pivotId || filter.id;
    if (row[id] !== undefined && filter.value !== undefined) {
      return String(row[id])
        .toUpperCase()
        .startsWith(filter.value.toUpperCase());
    }
    return true;
  }

  render() {
    const { theme, ...rest } = this.props;
    const { grommet } = this.context;
    const defaults = {
      defaultFilterMethod: Table.defaultFilter,
      showPagination: rest.data && rest.data.length > (rest.defaultPageSize || 20),
      minRows: rest.data && rest.data.length < (rest.defaultPageSize || 20) ? 0 : undefined,
      ThComponent,
      TdComponent,
      PaginationComponent,
      NoDataComponent,
      FilterComponent,
      TableComponent,
      TrComponent,
    };
    const props = { ...defaults, ...rest };
    return (
      <StyledTable
        {...props}
        theme={theme}
        grommet={grommet}
      />
    );
  }
}

export default compose(withTheme)(Table);
