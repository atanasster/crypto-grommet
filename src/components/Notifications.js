import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from './grommet/Notification/Notification';
import { deleteNotification } from '../actions/notifications/actions';


const NotificationsContainer = (props) => {
  let notifications;
  if (props.notifications.length > 0) {
    notifications = props.notifications.map((notification) => {
      const { message, status, id } = notification;
      return (
        <Notification
          key={id}
          closer={true}
          status={status}
          message={message}
          onClose={() => this.props.deleteNotification(id)}
        />
      );
    });
  }
  if (!notifications) return null;
  return (
    <Fragment>
      {notifications}
    </Fragment>
  );
};

const mapStateToProps = state => ({ notifications: state.notifications });

const mapDispatchToProps = dispatch => bindActionCreators({ deleteNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
