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
  renderPriceCards() {
    const { priceHistory, symbolPairs } = this.props;
    const priceCards = [];
    symbolPairs.forEach((pair, index) => {
      const data = priceHistory.find(h => (
        h.symbol === pair.symbol &&
        h.toSymbol === pair.toSymbol &&
        h.exchange === pair.exchange
      ));
      if (data) {
        priceCards.push({ history: data, index });
      }
    });
    return priceCards.map((data) => {
      const colors = [
        'brand', 'accent-1', 'accent-2', 'neutral-1', 'neutral-2', 'neutral-3', 'status-ok', 'status-warning',
      ];
      const colorIdx = data.index % colors.length;
      return (
        <PriceCard key={`history_${data.index}`} history={data.history} color={colors[colorIdx]} />
      );
    });
  }

  render() {
    return (
      <Box margin={{ bottom: 'xsmall' }} pad='xsmall' align='center'>
        <CardScroll>
          {this.renderPriceCards()}
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
