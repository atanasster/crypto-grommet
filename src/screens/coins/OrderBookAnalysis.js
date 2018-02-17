import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardScroll from '../../components/CardScroll';
import OrderBookCard from '../../components/cards/OrderBookCard';
import { actionToKey } from '../../actions/price_stream/constants';

class OrderBookAnalysis extends Component {
  state = { cards: [] };

  componentDidMount() {
    this.buildOrderBookCards(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { symbol, toSymbol } = nextProps;
    const { exchanges } = nextProps;
    if (symbol !== this.props.symbol ||
      toSymbol !== this.props.toSymbol ||
      Object.keys(exchanges).length !== Object.keys(this.props.exchanges).length) {
      this.buildOrderBookCards(nextProps);
    }
  }

  buildOrderBookCards(props) {
    const { exchanges, symbol, toSymbol } = props;
    const selected = Object.keys(exchanges)
      .map(key => (exchanges[key]))
      .filter(exchange => (exchange.hasOrderBook));
    const cards = selected.map(exchange => (
      <OrderBookCard
        key={`order_${exchange.name}`}
        exchange={exchange.name}
        symbol={symbol}
        toSymbol={toSymbol}
      />
    ));
    this.setState({ cards });
  }

  renderSortedCards() {
    const { cards } = this.state;
    const { orderBook } = this.props;
    return cards.sort((c1, c2) => {
      const a = orderBook[actionToKey(c1.props)];
      const b = orderBook[actionToKey(c2.props)];
      if (!a || !b) {
        if (b) {
          return -1;
        }
        return a ? 1 : 0;
      }
      const aAsks = a.data.asks;
      const bAsks = b.data.asks;
      if (aAsks.length === 0 || bAsks.length === 0) {
        return bAsks.length - aAsks.length;
      }
      return aAsks[0][0] - bAsks[0][0];
    });
  }

  render() {
    return (
      <CardScroll>
        {this.renderSortedCards()}
      </CardScroll>
    );
  }
}

OrderBookAnalysis.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  orderBook: state.orderBook.data,
  exchanges: state.exchanges.all,
});

export default connect(mapStateToProps)(OrderBookAnalysis);
