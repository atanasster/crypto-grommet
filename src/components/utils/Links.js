import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, RoutedAnchor } from 'grommet';

export const NavAnchor = props => (
  <RoutedAnchor {...props} />
);

NavAnchor.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  a11yTitle: PropTypes.string.isRequired,
};

export const ExternalAnchor = props => (
  <Anchor {...props} />
);

ExternalAnchor.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  a11yTitle: PropTypes.string.isRequired,
};

