import React, { Component } from 'react';
import { Box } from 'grommet';
import App from '../components/App';
import AuthForm from '../components/auth/AuthForm';
import withData from '../apollo/withData';

export default withData(class LoginPage extends Component {
  render() {
    return (
      <App title='login'>
        <Box direction='row' justify='start' border='top'>
          <Box basis='medium' flex={false} >
            <AuthForm />
          </Box>
        </Box>
      </App>
    );
  }
});
