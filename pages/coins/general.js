import React from 'react';
import { withRouter } from 'next/router';
import { Box } from 'grommet';
import { compose, graphql } from 'react-apollo';
import App from '../../components/App';
import Coin, { hasICO } from '../../components/coins/Coin';
import connect from '../../redux';
import withData from '../../apollo/withData';
import { coinInfoQuery, coinDetailsQuery } from '../../graphql/coins';
import CoinDashboard from '../../components/coins/CoinDashboard';
import OrderBookAnalysis from '../../components/coins/OrderBookAnalysis';
import LinksMenu from '../../components/LinksMenu';

const coinMenu =
 ({
   symbol, toSymbol, exchange,
 }) => [
   {
     route: 'coin_info',
     params: {
       symbol, toSymbol, exchange, page: 'info',
     },
     label: 'info',
     a11yTitle: `Information about ${symbol}`,
     plain: true,
   },
   {
     route: 'coin_info',
     params: {
       symbol, toSymbol, exchange, page: 'orderbooks',
     },
     label: 'orderbooks',
     a11yTitle: `Order books analysis for ${symbol}`,
     plain: true,
   },
 ];

const renderView = ({
  page, symbol, toSymbol, exchange,
}) => {
  switch (page) {
    case 'orderbooks':
      return (<OrderBookAnalysis
        symbol={symbol}
        toSymbol={toSymbol}
        exchange={exchange}
      />);
    case 'info':
    default:
      return <CoinDashboard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />;
  }
};


class CoinInfo extends React.Component {
  render() {
    const {
      symbol, toSymbol, exchange, coin: { coin }, toCoin: { coin: toCoin }, page,
    } = this.props;
    const notifications = [];
    if (coin) {
      if (coin.infoMessage) {
        notifications.push({ message: coin.infoMessage, status: 'info' });
      }
      if (coin.dangerMessage) {
        notifications.push({ message: coin.dangerMessage, status: 'error' });
      }
      if (coin.warningMessage) {
        notifications.push({ message: coin.warningMessage, status: 'warning' });
      }
    }
    return (
      <App
        title={`${symbol}/${toSymbol}/${exchange}`}
        notifications={notifications}
        description={coin && (hasICO(coin) ? coin.icoDescription : coin.description)}
        visibleTitle={coin && (
          <Box direction='row' align='center' justify='between' fill='horizontal'>
            <Coin size='xlarge' coin={coin} toCoin={toCoin} exchange={exchange} />
            <LinksMenu
              items={coinMenu({ symbol, toSymbol, exchange })}
              activeItem={coinMenu({ symbol, toSymbol, exchange })
                .findIndex(item => item.label === page)
              }
            />
          </Box>
        )}
      >
        {coin && toCoin ? renderView({
           page, symbol, toSymbol, exchange,
          }) : null
        }
      </App>
    );
  }
}


const mapStateToProps = (state, props) => {
  const exchange = props.router.query.exchange || state.settings.defaultExchange;
  const symbol = props.router.query.symbol || 'BTC';
  const toSymbol = props.router.query.toSymbol || state.settings.defaultCurrency;
  return {
    exchange,
    symbol,
    toSymbol,
    page: props.router.query.page || 'info',
  };
};


export default withRouter(withData(connect(mapStateToProps)(compose(
  graphql(coinDetailsQuery, { name: 'coin', options: props => ({ variables: { symbol: props.symbol } }) }),
  graphql(coinInfoQuery, { name: 'toCoin', options: props => ({ variables: { symbol: props.toSymbol } }) }),
)(CoinInfo))));
