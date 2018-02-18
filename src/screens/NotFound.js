import React, { Component } from 'react';
import { RoutedAnchor, Heading, Paragraph } from 'grommet';
import Page from '../components/Page';

export default class NotFoundPage extends Component {
  render() {
    return (
      <Page name='Not found'>
        <Heading level={1}>
          <strong>Page not found</strong>
        </Heading>
        <Paragraph>
          Sorry, we cannot find the page that you are looking for.
          It might have been removed, its name changed, or is temporarily unavailable.
        </Paragraph>
        <Paragraph>
          Go to our <RoutedAnchor path='/' label='Home page' /> and use the navigation to locate a specific page.
        </Paragraph>
      </Page>

    );
  }
}
