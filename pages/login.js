import React, { Component } from 'react';
import App from '../components/App';
import AuthForm from '../components/auth/AuthForm';
import withData from '../apollo/withData';

export default withData(class LoginPage extends Component {
  state = { title: '' };

  render() {
    return (
      <App title={this.state.title}>
        <AuthForm onTitle={title => this.setState({ title })} />
      </App>
    );
  }
});
