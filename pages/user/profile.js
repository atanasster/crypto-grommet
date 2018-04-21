import React from 'react';
import App from '../../components/App';
import withData from '../../apollo/withData';
import UserProfile from '../../components/auth/UserProfile';

export default withData(() => (
  <App title='Profile'>
    <UserProfile />
  </App>
));
