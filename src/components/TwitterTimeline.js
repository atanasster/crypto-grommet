import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import Card from './cards/Card';

export default ({ user }) => (
  <Card title={`@${user}`}>
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: user,
      }}
      options={{
        username: user,
        height: '700',
      }}
    />
  </Card>
);

