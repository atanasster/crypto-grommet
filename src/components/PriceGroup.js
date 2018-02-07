import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box } from 'grommet';
import { getPriceHistory } from '../actions/price_history/actions';
import CardScroll from './CardScroll';
import PriceCard from './PriceCard';


class PriceGroup extends Component {
  componentDidMount() {
    const { symbolPairs } = this.props;
    symbolPairs.forEach((pair) => {
      this.props.getPriceHistory(pair);
    });
  }

  render() {
    const { priceHistory } = this.props;
    const priceCards = priceHistory.map((history, index) => {
      const colors = [
        'brand', 'accent-1', 'accent-2', 'neutral-1', 'neutral-2', 'neutral-3', 'status-ok', 'status-warning',
      ];
      const colorIdx = index % colors.length;
      return (
        <PriceCard key={`history_${index}`} history={history} color={colors[colorIdx]} />
      );
    });
    return (
      <Box margin={{ bottom: 'xsmall' }} pad='xsmall' align='center'>
        <CardScroll>
          {priceCards}
        </CardScroll>
      </Box>
    );
  }
}

PriceGroup.propTypes = {
  symbolPairs: PropTypes.array.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ getPriceHistory }, dispatch);

const mapStateToProps = state => ({ priceHistory: state.priceHistory });

export default connect(mapStateToProps, mapDispatchToProps)(PriceGroup);
