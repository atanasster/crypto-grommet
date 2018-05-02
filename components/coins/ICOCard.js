import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import numeral from 'numeral';
import { Box, Anchor } from 'grommet';
import { PagingTable, Card } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import { shortDate } from 'grommet-controls/utils/moment';
import Coin, { hasICO } from './Coin';
import { icoDetailsQuery } from '../graphql/coins';


class ICOCard extends Component {
  renderTable() {
    const { data: { coin } } = this.props;
    if (coin) {
      const rows = [
        {
          label: 'Blog',
          value: (
            <Anchor href={coin.icoBlogURL} target='_blank' label={coin.icoBlogURL} />
          ),
        }, {
          label: 'Web site',
          value: (
            <Anchor href={coin.icoWebsiteURL} target='_blank' label={coin.icoWebsiteURL} />
          ),
        }, {
          label: 'White paper',
          value: (
            <Anchor href={coin.icoWhitePaperURL} target='_blank' label={coin.icoWhitePaperURL} />
          ),
        }, {
          label: 'Date',
          value: shortDate(coin.icoDate),
        }, {
          label: 'End date',
          value: coin.icoEndDate ? shortDate(coin.icoEndDate) : 'N/A',
        }, {
          label: 'Features',
          value: (
            <Box>
              {coin.icoFeatures}
            </Box>
          ),
        }, {
          label: 'Token type',
          value: coin.icoTokenType,
        }, {
          label: 'Funding target',
          value: coin.icoFundingTarget,
        }, {
          label: 'Payment',
          value: (
            <Box >
              {coin.icoPaymentMethod}
            </Box>
          ),
        }, {
          label: 'Start price',
          value: coin.icoStartPrice,
        }, {
          label: 'Start crypto',
          value: coin.icoStartPriceCurrency,
        }, {
          label: 'Funds raised',
          value: coin.icoFundsRaisedList,
        }, {
          label: '% for investors',
          value: coin.icoTokenPercentageForInvestors,
        }, {
          label: 'Reserve split',
          value: (
            <Box>
              {coin.icoTokenReserveSplit}
            </Box>
          ),
        }, {
          label: 'Token supply',
          value: coin.icoTokenSupply,
        }, {
          label: 'Supply post ICO',
          value: coin.icoTokenSupplyPostICO,
        }, {
          label: 'Funding cap',
          value: coin.icoFundingCap,
        }, {
          label: 'Funds raised (USD)',
          value: numeral(coin.icoFundsRaisedUSD).format('$0,0.00'),
        }, {
          label: 'Jurisdiction',
          value: coin.icoJurisdiction,
        }, {
          label: 'Legal advisers',
          value: coin.icoLegalAdvisers,
        }, {
          label: 'Legal form',
          value: coin.icoLegalForm,
        },
      ];
      return (
        <Box full='horizontal'>
          <PagingTable
            data={rows}
            sortable={false}
            resizable={false}
            showPagination={false}
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
    const { data: { coin } } = this.props;
    if (!coin || !hasICO(coin)) {
      return null;
    }
    return (
      <Card
        size={{ height: 'large' }}
        subTitle='SUB'
      >
        <CardTitle>
          {coin && <Coin coin={coin} />}
        </CardTitle>
        <CardSubTitle>
          {coin && coin.icoStatus}
        </CardSubTitle>
        <CardContent>
          <Box pad='small' fill='horizontal'>
            {this.renderTable()}
          </Box>
        </CardContent>
      </Card>
    );
  }
}

ICOCard.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  symbol: PropTypes.string.isRequired,
};

export default graphql(icoDetailsQuery,
  { options: props => ({ variables: { symbol: props.symbol } }) })(ICOCard);

