import React, { Component } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Box, Button, Select, TextInput, Text } from 'grommet';
import { Blank, Previous, Next } from 'grommet-icons';

const defaultButton = ({ disabled, Icon, onClick, label, ...other }) => (
  <Button
    icon={<Icon />}
    onClick={disabled ? undefined : onClick}
    label={label}
    {...other}
  />
);

const StyledButton = styled(defaultButton)`
  width: 150px;
`;

const StyledPageInput = styled(TextInput)`
  max-width: 120px;
  margin: 0 10px;
`;

const StyledSelect = styled(Select)`
  max-width: 80px;
`;
const Spacing = ({ size }) => (<Blank size={size || 'small'} />);

export default class ReactTablePagination extends Component {
  constructor(props) {
    super();
    this.state = { page: props.page };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page });
  }

  getSafePage = (page) => {
    const pg = isNaN(page) ? this.props.page : page;
    return Math.min(Math.max(pg, 0), this.props.pages - 1);
  };

  changePage = (page) => {
    const pg = this.getSafePage(page);
    this.setState({ pg });
    if (this.props.page !== pg) {
      this.props.onPageChange(pg);
    }
  };

  applyPage = (e) => {
    if (e) {
      e.preventDefault();
    }
    const page = this.state.page;
    this.changePage(page === '' ? this.props.page : page);
  };
  renderPaging() {
    const { page, showPageJump, pageText, ofText, pages } = this.props;
    let pageJump;
    if (showPageJump) {
      pageJump = (
        <StyledPageInput
          aria-label='Select page to jump to'
          type={this.state.page === '' ? 'text' : 'number'}
          onChange={(e) => {
            const val = e.target.value;
            const pg = val - 1;
            if (val === '') {
              return this.setState({ page: val });
            }
            this.setState({ page: this.getSafePage(pg) });
            return false;
          }}
          value={this.state.page === '' ? '' : this.state.page + 1}
          onBlur={this.applyPage}
          onKeyPress={(e) => {
            if (e.which === 13 || e.keyCode === 13) {
              this.applyPage();
            }
          }}
        />
      );
    } else {
      pageJump = <Text>{page + 1}</Text>;
    }
    return (
      <Box direction='row' align='center' >
        <Text>{`${pageText} `}</Text>
        {pageJump}
        <span style={{ whiteSpace: 'nowrap' }}>{`${ofText} ${pages || 1}`}</span>
        <Spacing size='large' />
      </Box>
    );
  }

  renderPageSize() {
    const { showPageSizeOptions, onPageSizeChange, pageSizeOptions, pageSize } = this.props;
    if (showPageSizeOptions) {
      return (
        <Box direction='row'>
          <StyledSelect
            aria-label='Select rows per page'
            onChange={e => onPageSizeChange(Number(e.option.split(' ')[0]))}
            value={`${pageSize} ${this.props.rowsText}`}
            options={pageSizeOptions.map(option => (`${option} ${this.props.rowsText}`))}
          />
          <Spacing size='large' />
        </Box>
      );
    }
    return null;
  }

  renderPrevious() {
    const { PreviousComponent = StyledButton, canPrevious, page } = this.props;
    return (
      <Box direction='row' >
        <PreviousComponent
          aria-label='Move to previous page'
          Icon={Previous}
          label={this.props.previousText}
          onClick={canPrevious ? () => this.changePage(page - 1) : null}
          disabled={!canPrevious}
        />
        <Spacing size='large' />
      </Box>
    );
  }

  renderNext() {
    const { page, canNext, NextComponent = StyledButton } = this.props;
    if (canNext) {
      return (
        <Box direction='row' >
          <NextComponent
            aria-label='Move to next page'
            reverse={true}
            Icon={Next}
            label={this.props.nextText}
            onClick={canNext ? () => this.changePage(page + 1) : null}
            disabled={!canNext}
          />
        </Box>
      );
    }
    return null;
  }

  render() {
    const { className } = this.props;
    return (
      <Box align='center' className={classnames(className, '-pagination')} pad='small'>
        <Box direction='row' align='center' style={this.props.style} >
          {this.renderPrevious()}
          {this.renderPaging()}
          {this.renderPageSize()}
          {this.renderNext()}
        </Box>
      </Box>
    );
  }
}
