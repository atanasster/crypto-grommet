const url = require('url');
const { request } = require('graphql-request');


const activateEmailMutation = `
  mutation activateEmail($uid: String!, $token: String!) {
    activate(uid: $uid, token: $token) {
      token
      user {
        username
        email
        profile {
          image
        }
      }  
    }
  }    
`;
const middleware = (app) => {
  app.get('/activate/:uid/:token', (req, res) => {
    const { uid, token } = req.params;
    request(process.env.GRAPHQL_SERVER, activateEmailMutation, { uid, token })
      .then(() => res.redirect(url.format({
        pathname: '/login',
      })))
      .catch(err => console.log(err.response.errors[0].message));
  });
};

module.exports = {
  middleware,
};
