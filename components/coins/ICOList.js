import React, { Component } from 'react';
import { Box, Markdown, Anchor } from 'grommet';
import { shortDate } from 'grommet-controls/utils';
import connect from '../../redux';
import Coin from './Coin';
import ICOCard from './ICOCard';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { allICOCoinsQuery } from '../../graphql/coins';


class ICOList extends Component {
  onExpand = ({ row }) => (
    <Box direction='row-responsive' pad='small' gap='medium'>
      {row.icoDescription && (
      <Box width='400px'>
        <Markdown >
          {row.icoDescription}
        </Markdown>
      </Box>
        )}
      <Box>
        <ICOCard
          symbol={row.symbol}
        />
      </Box>
    </Box>
  );
  render() {
    const { data, loadMoreEntries } = this.props;
    const columns = [
      {
        title: 'Coin',
        name: 'name',
        formatter: ({ row }) => (
          <Coin
            coin={row}
            toCoin={{ symbol: this.props.defaultCurrency }}
            exchange={this.props.defaultExchange}
            level={4}
            border={null}
          />
        ),
      }, {
        title: 'Status',
        name: 'icoStatus',
      }, {
        title: 'Start date',
        name: 'icoDate',
        formatter: ({ value }) => (shortDate(value)),
      }, {
        title: 'End date',
        name: 'icoEndDate',
        formatter: ({ value }) => (value ? shortDate(value) : 'N/A'),
      }, {
        title: 'Token type',
        name: 'icoTokenType',
      }, {
        title: 'Funding target',
        name: 'icoFundingTarget',
        align: 'right',
      },
      {
        title: 'Description',
        name: 'icoDescription',
        visibility: 'hidden',
      },
      {
        title: 'Blog',
        name: 'icoBlogURL',
        visibility: 'hidden',
        formatter: ({ value }) => <Anchor href={value} target='_blank'>{value}</Anchor>,
      },
      {
        title: 'Website',
        name: 'icoWebsiteURL',
        visibility: 'hidden',
        formatter: ({ value }) => <Anchor href={value} target='_blank'>{value}</Anchor>,
      },
      {
        title: 'ICO page',
        name: 'icoWhitePaperURL',
        visibility: 'hidden',
        formatter: ({ value }) => <Anchor href={value} target='_blank'>{value}</Anchor>,
      },
      {
        title: 'Features',
        name: 'icoFeatures',
        visibility: 'hidden',
      },
      {
        title: 'Start price',
        name: 'icoStartPrice',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Currency',
        name: 'icoStartPriceCurrency',
        visibility: 'hidden',
      },
      {
        title: 'Funds raised',
        name: 'icoFundsRaisedList',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: '% Investors',
        name: 'icoTokenPercentageForInvestors',
        visibility: 'hidden',
        formatter: ({ value }) => `${value}%`,
        align: 'right',
      },
      {
        title: 'Reserve split',
        name: 'icoTokenReserveSplit',
        visibility: 'hidden',
      },
      {
        title: 'Reserve split',
        name: 'icoTokenSupply',
        visibility: 'hidden',
      },
      {
        title: 'Post ICO supply',
        name: 'icoTokenSupplyPostICO',
        visibility: 'hidden',
      },
      {
        title: 'Funding Cap',
        name: 'icoFundingCap',
        visibility: 'hidden',
      },
      {
        title: 'Raised USD',
        name: 'icoFundsRaisedUSD',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Jurisdiction',
        name: 'icoJurisdiction',
        visibility: 'hidden',
      },
      {
        title: 'Legal advisors',
        name: 'icoLegalAdvisers',
        visibility: 'hidden',
      },
      {
        title: 'Legal form',
        name: 'icoLegalForm',
        visibility: 'hidden',
      },
      {
        title: 'Payment method',
        name: 'icoPaymentMethod',
        visibility: 'hidden',
      },
    ];
    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        sorting={[{ columnName: 'icoDate', direction: 'desc' }]}
        gqlProps={{ hasICO: true }}
      />
    );
  }
}

const mapStateToProps = state => ({
  defaultCurrency: state.settings.defaultCurrency,
  exchange: state.settings.aggregatedExchange,
  defaultExchange: state.settings.defaultExchange,
});

export default withGraphQLList(allICOCoinsQuery, connect(mapStateToProps)(ICOList));

