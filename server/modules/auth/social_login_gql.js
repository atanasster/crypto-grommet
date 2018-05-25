
module.exports = `
  mutation socialLoginMutation($input: SocialLoginInput!) {
    socialLogin(input: $input) {
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
