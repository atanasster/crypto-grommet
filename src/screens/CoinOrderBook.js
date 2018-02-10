import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardScroll from '../components/CardScroll';
import CoinPage from '../components/CoinPage';
import OrderBookCard from '../components/OrderBookCard';
import { actionToKey } from '../actions/price_stream/constants';

class OrderBook extends Component {
  state = { cards: [] };

  componentDidMount() {
    this.buildOrderBookCards(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { symbol, toSymbol } = nextProps.match.params;
    const { exchanges } = nextProps;
    if (symbol !== this.props.match.params.symbol ||
      toSymbol !== this.props.match.params.toSymbol ||
      exchanges.length !== this.props.exchanges.length) {
      this.buildOrderBookCards(nextProps);
    }
  }

  buildOrderBookCards(props) {
    const { exchanges } = props;
    const { symbol, toSymbol } = props.match.params;
    const selected = exchanges.filter(exchange => (exchange.hasOrderBook));
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
      <CoinPage {...this.props.match.params} >
        <CardScroll>
          {this.renderSortedCards()}
        </CardScroll>
      </CoinPage>
    );
  }
}

const mapStateToProps = state =>
  ({
    orderBook: state.orderBook.data,
    exchanges: state.exchanges.all,
  });

export default connect(mapStateToProps)(OrderBook);
