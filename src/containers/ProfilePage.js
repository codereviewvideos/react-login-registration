import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ProfileArea from '../components/ProfileArea';
import * as types from '../constants/actionTypes';

class ProfilePage extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: types.PROFILE__REQUESTED,
      payload: {
        userId: this.props.pageState.auth.id
      }
    });
  }

  render() {

    const {
      username = '',
      email = ''
    } = this.props.pageState.profile;

    return (
      <div>
        <ProfileArea username={username} emailAddress={email}/>
      </div>
    );
  }

}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pageState: state
  };
}

export default connect(mapStateToProps)(ProfilePage);
