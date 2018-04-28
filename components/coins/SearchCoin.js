import React from 'react';
import { Box, DropButton, TextInput } from 'grommet';


class SearchCoin extends React.Component {
  onSearch = (e) => {
    console.log(e.target.value);
  }
  render() {
    return (
      <DropButton
        plain={true}
        label='search'
        dropAlign={{ top: 'bottom', right: 'right' }}
        dropContent={
          <Box>
            <TextInput placeholder='Search' onChange={this.onSearch} />
          </Box>
        }
      />
    );
  }
}


export default SearchCoin;
