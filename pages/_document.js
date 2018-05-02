import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import htmlescape from 'htmlescape';

const { GRAPHQL_SERVER } = process.env;
const env = { GRAPHQL_SERVER };

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang='en-US'>
        <Head>
          {this.props.styleTags}
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <meta name='fragment' content='!' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='apple-touch-icon' sizes='57x57' type='image/png' href='/static/img/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' type='image/png' href='/static/img/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' type='image/png' href='/static/img/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' type='image/png' href='/static/img/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' type='image/png' href='/static/img/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' type='image/png' href='/static/img/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' type='image/png' href='/static/img/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' type='image/png' href='/static/img/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' type='image/png' href='/static/img/apple-icon-180x180.png' />
          <link rel='icon' sizes='192x192' type='image/png' href='/static/img/android-icon-192x192.png' />
          <link rel='icon' sizes='32x32' type='image/png' href='/static/img/favicon-32x32.png' />
          <link rel='icon' sizes='96x96' type='image/png' href='/static/img/favicon-96x96.png' />
          <link rel='icon' sizes='16x16' type='image/png' href='/static/img/favicon-16x16.png' />
          <link rel='manifest' href='/static/img/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/static/img/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body style={{ margin: 0 }} >
          <Main />
          <script
            dangerouslySetInnerHTML={{ __html: `__ENV__ = ${htmlescape(env)}` }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
