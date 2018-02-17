import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Heading as GrommetHeading } from 'grommet';

const HeadingInternal = props => (
  <GrommetHeading {...props} />
);

const mapStateToProps = (state, props) => ({
  level: state.nav.responsive ? Math.min(props.level + 2, 4) : props.level,
});

HeadingInternal.propTypes = {
  level: PropTypes.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export const Heading = connect(mapStateToProps)(HeadingInternal);

