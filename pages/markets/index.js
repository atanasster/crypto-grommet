import React from 'react';
import App from '../../components/App';
import withData from '../../apollo/withData';
import MarketCapList from '../../components/coins/MarketCapList';
import connect from '../../redux';


class MarketCap extends React.Component {
  render() {
    const { defaultExchange, defaultCurrency } = this.props;
    return (
      <App title='Market Cap'>
        <MarketCapList exchange={defaultExchange} currency={defaultCurrency} />
      </App>
    );
  }
}

const mapStateToProps = state => ({
  defaultExchange: state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});


export default withData(connect(mapStateToProps)(MarketCap));
