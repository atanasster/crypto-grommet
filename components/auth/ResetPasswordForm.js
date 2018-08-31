import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import { Box, Button } from 'grommet';
import { Form, PasswordInputField, validators } from 'grommet-controls';
import connect from '../../redux';
import { addError, addSuccessMessage } from '../../redux/notifications/actions';
import ResetPasswordMutation from './graphql/ResetPassword.graphql';
import routerPush from '../Router';


class ResetPasswordForm extends Component {
  getServerErrors(err) {
    if (err.graphQLErrors || err.networkError) {
      const message = err.graphQLErrors.length ?
        err.graphQLErrors[0].message : err.networkError.result.errors[0].message;
      this.props.addError(message);
    }
  }


  onSubmitRegister = ({ password, passwordConfirm }) => {
    const { token, uid } = this.props;
    this.props.mutate({
      variables: {
        input: {
          password, passwordConfirm, token, uid,
        },
      },
    })
      .then((response) => {
        if (response.data && response.data.resetPasswordConfirm.success) {
          this.props.addSuccessMessage('The password was successfully changed.');
          routerPush({ route: 'login' });
        }
      })
      .catch((err) => {
        this.getServerErrors(err);
      });
  };
  render() {
    return (
      <Box pad={{ vertical: 'small' }}>
        <Form onSubmit={this.onSubmitRegister} basis='medium'>
          <PasswordInputField
            label='Password'
            name='password'
            validation={
              [validators.required(), validators.minLength(5), validators.alphaNumeric()]
            }
          />
          <PasswordInputField
            label='Confirm Password'
            name='passwordConfirm'
            validation={[validators.equalsField('password')]}
          />

          <Box pad='small'>
            <Button type='submit' label='Submit' />
          </Box>
        </Form>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addError, addSuccessMessage }, dispatch);

export default graphql(ResetPasswordMutation)(connect(null, mapDispatchToProps)(ResetPasswordForm));
