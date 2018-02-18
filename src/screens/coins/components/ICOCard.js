import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { Box, Anchor, Text } from 'grommet';
import Card from '../../../components/Card';
import Table from '../../../components/table/Table';
import Coin from '../../../components/Coin';


class ICOCard extends Component {
  renderTable() {
    const { coin } = this.props;

    if (coin) {
      const { ICO } = coin;
      const rows = [
        {
          label: 'Blog',
          value: (
            <Anchor href={ICO.blogLink} target='_blank' label={ICO.blogLink} />
          ),
        }, {
          label: 'Web site',
          value: (
            <Anchor href={ICO.websiteURL} target='_blank' label={ICO.websiteURL} />
          ),
        }, {
          label: 'White paper',
          value: (
            <Anchor href={ICO.whitePaperLink} target='_blank' label={ICO.whitePaperLink} />
          ),
        }, {
          label: 'Date',
          value: moment(ICO.date).format('LL'),
        }, {
          label: 'Features',
          value: (
            <Box>
              {ICO.features.split(',').map((item, index) => (
                <Text key={`feature_${index}`} >{item}</Text>
              ))}
            </Box>
          ),
        }, {
          label: 'Token type',
          value: ICO.tokenType,
        }, {
          label: 'Funding target',
          value: ICO.fundingTarget,
        }, {
          label: 'Payment',
          value: (
            <Box gap='small'>
              {ICO.paymentMethod.split(',').map((symbol, index) => (
                <Coin key={`payment_${index}`} level={4} symbol={symbol} border={null} />
              ))}
            </Box>
          ),
        }, {
          label: 'Start price',
          value: ICO.startPrice,
        }, {
          label: 'Start crypto',
          value: ICO.startPrice,
        }, {
          label: 'Funds raised',
          value: ICO.startPriceCurrency,
        }, {
          label: '% for investors',
          value: ICO.tokenPercentageForInvestors,
        }, {
          label: 'Reserve split',
          value: (
            <Box>
              {ICO.tokenReserveSplit.split(',').map((item, index) => (
                <Text key={`reserve_${index}`} >{item}</Text>
              ))}
            </Box>
          ),
        }, {
          label: 'Token supply',
          value: ICO.tokenSupply,
        }, {
          label: 'Supply post ICO',
          value: ICO.tokenSupplyPostICO,
        }, {
          label: 'Funding cap',
          value: ICO.fundingCap,
        }, {
          label: 'Funds raised (USD)',
          value: numeral(ICO.fundsRaisedUSD).format('$0,0.00'),
        }, {
          label: 'Jurisdiction',
          value: ICO.jurisdiction,
        }, {
          label: 'Legal advisers',
          value: ICO.legalAdvisers,
        }, {
          label: 'Legal form',
          value: ICO.legalForm,
        },
      ];
      return (
        <Box align='center' >
          <Table
            data={rows}
            columns={[
              { accessor: 'label', width: 200 },
              { accessor: 'value' },
            ]}
          />
        </Box>
      );
    }
    return null;
  }

  render() {
    const { symbol, coin } = this.props;
    const ico = coin && coin.ICO ? coin.ICO : null;
    return (
      <Card
        basis='large'
        title={<Coin symbol={symbol} />}
        subTitle={ico && ico.status}
      >
        <Box pad='small'>
          {this.renderTable()}
        </Box>
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  coin: state.coins.all[props.symbol],
});

ICOCard.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ICOCard);

