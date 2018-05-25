const { request } = require('graphql-request');

module.exports = (gql, vars) => (request(process.env.GRAPHQL_SERVER, gql, vars));
