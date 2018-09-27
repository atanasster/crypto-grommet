import React, { Component } from 'react';
import { Box, Heading } from 'grommet';
import { ImageStamp, Card } from 'grommet-controls';
import connect from '../../redux';
import DoubleTitle from '../DoubleTitle';

class UserProfile extends Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return (
      <Card size={{ width: 'xlarge' }}>
        <DoubleTitle>
          <Box direction='row'>
            {user.profile.image && <ImageStamp src={user.profile.image} round='full' />}
            <Heading margin='small'>{user.username}</Heading>
          </Box>
          {user.email}
        </DoubleTitle>
        <Card.CardContent />
      </Card>
    );
  }
}


const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserProfile);
