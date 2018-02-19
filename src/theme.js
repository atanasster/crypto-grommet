const fontPath = 'http://fonts.gstatic.com/s/roboto/v15';
export default {
  global: {
    colors: {
      brand: '#336699',
    },
    font: {
      family: "'Roboto', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 300;
          src:
            local('Roboto Light'),
            local('Roboto-Light'),
            url("${fontPath}/Hgo13k-tfSpn0qi1SFdUfZBw1xU1rKptJj_0jans920.woff2") format('woff2');
        }
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src:
            local('Roboto Regular'),
            local('Roboto-Regular'),
            url("${fontPath}/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2") format('woff2');
        }
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 500;
          src:
            local('Roboto Medium'),
            local('Roboto-Medium'),
            url("${fontPath}/RxZJdnzeo3R5zSexge8UUZBw1xU1rKptJj_0jans920.woff2") format('woff2');
        }
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 700;
          src:
            local('Roboto Bold'),
            local('Roboto-Bold'),
            url("${fontPath}/UX6i4JxQDm3fVTc1CPuwqoX0hVgzZQUfRDuZrPvH3D8.woff2") format('woff2');
        }
      `,
    },
  },
};

