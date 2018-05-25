import React, { Component } from 'react';
import { Heading } from 'grommet';
import { ImageStamp, Card } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import connect from '../../redux';

class UserProfile extends Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return (
      <Card size={{ width: 'xlarge' }}>
        <CardTitle pad='none'>
          {user.profile.image && <ImageStamp src={user.profile.image} round='full' />}
          <Heading margin='small'>{user.username}</Heading>
        </CardTitle>
        <CardSubTitle border='bottom'>
          {user.email}
        </CardSubTitle>
        <CardContent />
      </Card>
    );
  }
}


const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserProfile);
