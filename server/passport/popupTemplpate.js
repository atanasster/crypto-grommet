

export default ({ title, status, payload }) => ({
  isOAuth: true,
  body: `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body>
    <h1>${status}</h1>
  </body>
  <script>
    window.opener.postMessage(
      {
        payload: ${JSON.stringify(payload)},
        status: '${JSON.stringify(status)}'
      },
      window.opener.location
    );
  </script>
  </html>`,
});
