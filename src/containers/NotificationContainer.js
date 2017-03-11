import React from 'react';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';

class NotificationContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(newProps) {
    const {message, level} = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level
    });
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

export default connect(
  mapStateToProps
)(NotificationContainer);
