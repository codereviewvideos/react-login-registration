import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import RegistrationForm from '../components/RegistrationForm';
import * as types from '../constants/actionTypes';

class RegistrationPage extends React.Component {

  componentWillReceiveProps(newProps) {
    if (newProps.pageState.auth.isAuthenticated) {
      this.props.router.replace('/');
    }
  }

  handleRegistration({username, email, newPassword, newPasswordRepeated}) {
    this.props.dispatch({
      type: types.REGISTER__REQUESTED,
      payload: {
        username,
        email,
        newPassword,
        newPasswordRepeated
      }
    });
  }

  render() {
    return (
      <RegistrationForm
        onSubmit={this.handleRegistration.bind(this)}
        isSubmitting={this.props.pageState.request.isSubmitting}
      />
    );
  }

}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageState: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pageState: state
  };
}

export default connect(
  mapStateToProps
)(
  withRouter(RegistrationPage)
);
