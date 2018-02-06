import React from 'react';
import numeral from 'numeral';
import { Box, RoutedAnchor, Text, Image, Heading } from 'grommet';
import { Close, Checkmark } from 'grommet-icons';
import Table from './table/Table';
import { renderCountries, renderURLS } from './Exchange';
import SideLayer from './SideLayer';

const redIcon = {
  icon: {
    color: 'red',
  },
};

const greenIcon = {
  icon: {
    color: 'green',
  },
};

function yesNoIcon(value) {
  return value ? <Checkmark theme={greenIcon} /> : <Close theme={redIcon} />;
}

function tableOfFees(fees, key) {
  if (!fees) {
    return null;
  }
  return (
    <Table>
      <tbody>
        {Object.keys(fees).map(k => (
          <tr key={`${key}_${k}`}>
            <td>{k}</td>
            <td>{numeral(fees[k]).format('0,0.0000')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function tableOfTiers(tiers, key) {
  if (!tiers) {
    return null;
  }
  return (
    <Table>
      <tbody>
        {tiers.map((item, index) => (
          <tr key={`${key}_${index}`}>
            <td>{item[0]}</td>
            <td>{numeral(item[1]).format('0,0.0000')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default ({ exchange, onClose }) => {
  let fundingFees = null;
  if (exchange.fees && exchange.fees.funding) {
    fundingFees = (
      <Box>
        <Box direction='row' justify='between' pad={{ vertical: 'small' }}>
          <Box direction='row' align='center'><Text>Percentage:</Text>{yesNoIcon(exchange.fees.funding.percentage)}</Box>
          <Box direction='row' align='center'><Text>Tier based:</Text>{yesNoIcon(exchange.fees.funding.tierBased)}</Box>
        </Box>
        <Box direction='row'>
          <Box basis='1/2'>
            <Text size='medium'><strong>Deposit</strong></Text>
            {tableOfFees(exchange.fees.funding.deposit, 'f_d')}
          </Box>
          <Box basis='1/2'>
            <Text size='medium'><strong>Withdrawal</strong></Text>
            {tableOfFees(exchange.fees.funding.withdraw, 'f_w')}
          </Box>
        </Box>
      </Box>
    );
  }
  let tradingFees = null;
  if (exchange.fees && exchange.fees.trading) {
    let tiers = null;
    if (exchange.fees.trading.tiers) {
      tiers = (
        <Box direction='row'>
          <Box basis='1/2'>
            <Text size='medium'><strong>Maker</strong></Text>
            {tableOfTiers(exchange.fees.trading.tiers.maker, 't_m')}
          </Box>
          <Box basis='1/2'>
            <Text size='medium'><strong>Taker</strong></Text>
            {tableOfTiers(exchange.fees.trading.tiers.taker, 't_t')}
          </Box>
        </Box>
      );
    }
    tradingFees = (
      <Box>
        <Box direction='row' justify='between' pad={{ vertical: 'small' }}>
          <Box direction='row' align='center'><Text>Percentage:</Text>{yesNoIcon(exchange.fees.trading.percentage)}</Box>
          <Box direction='row' align='center'><Text>Tier based:</Text>{yesNoIcon(exchange.fees.trading.tierBased)}</Box>
        </Box>
        <Box direction='row' justify='between' pad={{ vertical: 'small' }}>
          <Box direction='row' align='center'>
            <Text>Maker:</Text>
            <Text>{exchange.fees.trading.maker}</Text>
          </Box>
          <Box direction='row' align='center'>
            <Text>Taker:</Text>
            <Text>{exchange.fees.trading.taker}</Text>
          </Box>
        </Box>
        {tiers}
      </Box>
    );
  }
  return (
    <SideLayer onClose={onClose} >
      <RoutedAnchor path={`/exchanges/${exchange.id}`}>
        <Box align='cener'>
          <Image
            src={exchange.logo}
            style={{ height: '40px', width: 'auto' }}
          />
          <Box direction='row' pad={{ vertical: 'small' }}>
            {renderCountries(exchange.countries)}
            <Text size='large'>{exchange.name}</Text>
          </Box>
        </Box>
      </RoutedAnchor>
      <Box>
        {renderURLS(exchange.url)}
      </Box>
      <Box
        pad={{ vertical: 'large' }}
        align='center'
        flex='grow'
        overflow='scroll'
      >
        <Heading level={4} margin='none'><strong>Trading fees</strong></Heading>
        {tradingFees}
      </Box>
      <Box
        align='center'
        flex='grow'
        overflow='scroll'
      >
        <Heading level={4} margin='none'><strong>Funding fees</strong></Heading>
        {fundingFees}
      </Box>
    </SideLayer>
  );
};
