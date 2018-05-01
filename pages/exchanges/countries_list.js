import { withRouter } from 'next/router';
import { Box, Text } from 'grommet';
import App from '../../components/App';
import ExchangesList from '../../components/exchanges/ExchangesList';
import withData from '../../apollo/withData';
import allCountries, { continents } from '../../components/exchanges/countries';

const Exchanges = ({ router: { query: { country } } }) => {
  const countryData = allCountries[country];
  let continent;
  if (countryData) {
    continent = continents.find(c => c.code === countryData.continent);
  }
  return (
    <App
      title={`Exchanges in ${countryData ? countryData.name : country}`}
    >
      {countryData && (
        <Box pad={{ bottom: 'medium' }} gap='small'>
          <Text size='large'>
            {`Capital: ${countryData.capital}`}
          </Text>
          {continent && (
            <Text>
              {`Continent: ${continent.name}`}
            </Text>
          )}
          <Text>
            {`Currency: ${countryData.currency}`}
          </Text>
        </Box>
      )}
      <ExchangesList
        country={country}
      />
    </App>
  );
};

export default withRouter(withData(Exchanges));
