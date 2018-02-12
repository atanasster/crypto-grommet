import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExchangePage from '../../components/pages/ExchangePage';
import FavoritePrices from '../../components/FavoritePrices';

class ExchangePrices extends Component {
  render() {
    const { exchange } = this.props;
    console.log(this.props);
    return (
      <ExchangePage exchange={exchange} >
        <FavoritePrices exchange={exchange} />
      </ExchangePage>
    );
  }
}


const mapStateToProps = (state, props) => ({ exchange: props.match.params.exchange });

export default connect(mapStateToProps)(ExchangePrices);
