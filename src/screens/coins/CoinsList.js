import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import {
  Box,
  Image,
  Anchor,
  RoutedAnchor,
} from 'grommet';
import Page from '../../components/pages/Page';
import Table from '../../components/table/Table';

class CoinsList extends Component {
  renderCoinsList() {
    const { coins: { all: allCoins } } = this.props;
    const rows = Object.keys(allCoins)
      // .filter(key => (allCoins[key].General && allCoins[key].General.Twitter))
      .sort((a, b) => {
        const aVal = a.toUpperCase();
        const bVal = b.toUpperCase();
        if (aVal > bVal) {
          return 1;
        } else if (aVal < bVal) {
          return -1;
        }
        return 0;
      })
      .map((key) => {
        const coin = allCoins[key];
        // console.log(coin);
        return (
          <tr key={coin.id} >
            <td><Anchor href={coin.url} target='_blank'><Image src={coin.imageUrl} style={{ width: '24px', height: '24px' }} /></Anchor></td>
            <td><RoutedAnchor path={`/coins/general/${coin.symbol}/USD/Bitstamp`}>{`${coin.coinName} (${coin.symbol})`}</RoutedAnchor></td>
            <td>{coin.algorithm}</td>
            <td>{coin.proofType}</td>
            <td>{coin.fullyPremined === '0' ? 'Yes' : ''}</td>
            <td>{coin.preMinedValue}</td>
            <td style={{ textAlign: 'right' }}>{numeral(coin.totalCoinSupply).format('0,000')}</td>
            <td>{coin.totalCoinsFreeFloat}</td>
            <td>{coin.sponsored ? 'Yes' : ''}</td>
          </tr>
        );
      });
    return (
      <Table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Algorithm</th>
            <th>Proof</th>
            <th>Fully Premined</th>
            <th>Pre-Mined Value</th>
            <th>Total Coin Supply</th>
            <th>Free Float</th>
            <th>Sponsor</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }
  render() {
    return (
      <Page name='Coins'>
        <Box
          align='center'
          direction='row'
          tag='header'
          pad={{ horizontal: 'medium' }}
        >
          {this.renderCoinsList()}
        </Box>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  coins: state.coins,
});

export default connect(mapStateToProps)(CoinsList);
