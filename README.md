# crypto-grommet

A sample project using: 
* grommet v2: https://v2.grommet.io/ 
* cctx: https://github.com/ccxt/ccxt
* CryptoCompare: https://www.cryptocompare.com/api/
* Highcharts: http://www.highcharts.com

Live site: https://crypto-grommet.herokuapp.com

To run this application, execute the following commands:

## Install
  
  * Get sources in local folder
  ```
  $ git clone https://github.com/atanasster/crypto-grommet.git
  ```

  * Move to your local folder
  ```
  $ cd crypto-grommet
  ```

  * Install dependencies
  ```
  $ npm install
  ```
## Local deployment

  * Start the back-end dev server:

  ```
  $ npm run start-server
  ```

  * Start the front-end dev server:

  ```
  $ npm run start
  ```

## Production deployment

  * Build client package

  ```
  $ npm run heroku-postbuild
  ```

  * Start production server

  ```
  $ npm run server
  ```

## Testing
 
 * Run linters:

  ```
  $ npm check
  ```
