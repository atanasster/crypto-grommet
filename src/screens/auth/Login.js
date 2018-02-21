import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Text, Anchor, TextInput, Button } from 'grommet';
import { Facebook, Google, Linkedin, Twitter } from 'grommet-icons';
import FormField from '../../components/grommet/Form/FormField';
import SideLayer from '../../components/SideLayer';
import { requestLogin } from '../../actions/session/actions';

const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';


function screenToState(screen) {
  switch (screen) {
    case LOGIN:
    default:
      return { screen, title: 'Log in' };
    case REGISTER:
      return { screen, title: 'Register' };
    case RECOVER_PASSWORD:
      return { screen, title: 'Recover password' };
  }
}

class Login extends Component {
  state = { ...screenToState(LOGIN), username: '', password: '' };

  switchNewAccount = () => {
    this.setState(screenToState(REGISTER));
  };

  switchLogin = () => {
    this.setState(screenToState(LOGIN));
  };

  switchRecoverPasswor = () => {
    this.setState(screenToState(RECOVER_PASSWORD));
  };

  onSubmitLogin = (e) => {
    const { username, password } = this.state;
    e.preventDefault();
    this.props.requestLogin({ username, password });
  };

  renderLogin() {
    const { username, password } = this.props;
    const onChangeName = ({ target: { value } }) => this.setState({ username: value });
    const onChangePassword = ({ target: { value } }) => this.setState({ password: value });
    return (
      <Box gap='small' overflow='scroll'>
        <Box direction='row'>
          <Text color='#888888' size='small'>
            New user? Signup for a <Anchor label='free account' onClick={this.switchNewAccount} />
          </Text>
        </Box>
        <Box pad={{ vertical: 'small' }}>
          <Text margin='none'>Signup with one of your social accounts:</Text>
          <Box direction='row' pad='small' justify='between'>
            <Box size='small'>
              <Anchor icon={<Facebook color='plain' />} label='Facebook' />
            </Box>
            <Box size='small'>
              <Anchor icon={<Twitter color='plain' />} label='Twitter' />
            </Box>
          </Box>
          <Box direction='row' pad='small' justify='between'>
            <Box size='small'>
              <Anchor icon={<Linkedin color='plain' />} label='LinkedIn' />
            </Box>
            <Box size='small'>
              <Anchor icon={<Google color='plain' />} label='Google' />
            </Box>
          </Box>
        </Box>
        <Box border='horizontal' pad={{ vertical: 'small' }}>
          <Text>Or with a user name and password:</Text>
          <form onSubmit={this.onSubmitLogin} >
            <FormField
              label='User name'
            >
              <TextInput
                value={username}
                onChange={onChangeName}
              />
            </FormField>
            <FormField label='Password'>
              <TextInput
                type='password'
                vale={password}
                onChange={onChangePassword}
              />
            </FormField>
            <Box margin={{ top: 'medium' }} align='center'>
              <Button primary={true} type='submit' label='Log in' />
            </Box>
          </form>
        </Box>
        <Text color='#888888' size='small'>
          <Anchor label='forgot password?' onClick={this.switchRecoverPasswor} />
        </Text>
      </Box>
    );
  }

  renderRegister() {
    return (
      <Box gap='small'>
        <Text>REGISTER</Text>
        <Text color='#888888' size='small'>
          Already have an account? <Anchor label='log in' onClick={this.switchLogin} />
        </Text>
      </Box>
    );
  }

  renderForgotPassword() {
    return (
      <Box gap='small'>
        <Text>recover password</Text>
        <Text color='#888888' size='small'>
          Remembered your password? <Anchor label='log in' onClick={this.switchLogin} />
        </Text>
      </Box>
    );
  }

  renderScreen() {
    const { screen } = this.state;
    switch (screen) {
      case LOGIN:
      default:
        return this.renderLogin();
      case REGISTER:
        return this.renderRegister();
      case RECOVER_PASSWORD:
        return this.renderForgotPassword();
    }
  }
  render() {
    const { onClose } = this.props;
    const { title } = this.state;
    return (
      <SideLayer onClose={onClose} heading={title} >
        <Text color='status-critical'>WORK IN PROGRESS !</Text>
        <Box pad={{ vertical: 'medium' }} border='top'>
          {this.renderScreen()}
        </Box>
      </SideLayer>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestLogin }, dispatch);

const mapStateToProps = state => ({ session: state.session });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
