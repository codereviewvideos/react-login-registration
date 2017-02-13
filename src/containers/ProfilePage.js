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
    return (
      <div>
        <ProfileArea username="peter" emailAddress="peter@whatever.com"/>
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
  }
}

export default connect(mapStateToProps)(ProfilePage);
