import React, { Component } from 'react';
import { Box, Text, Paragraph, Anchor, TextInput } from 'grommet';
import { Facebook, Google, Linkedin, Twitter } from 'grommet-icons';
import SideLayer from '../../components/SideLayer';

export default class Login extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <SideLayer onClose={onClose} heading='Log in' >
        <Box direction='row'>
          <Paragraph>
            {/* {'New user?  '}<Anchor path='/signup/'>Signup for a free account</Anchor> */}
            This form is in construction, not working !
          </Paragraph>
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
        <Text>Or with an e-mail and password:</Text>
        <TextInput
          type='email'
          label='E-mail'
          name='email'
        />
        <TextInput
          type='password'
          label='Password'
          name='password'
        />
      </SideLayer>
    );
  }
}
