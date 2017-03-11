import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as types from '../constants/actionTypes';
import RegistrationForm from '../components/RegistrationForm';
// import '../styles/registration-page.scss';

class RegistrationPage extends Component {

  componentWillReceiveProps(newProps) {
    if (newProps.pageState.auth.isAuthenticated) {
      this.props.router.replace('/');
    }
  }

  handleRegistration({username, email, newPassword, newPasswordRepeated}) {
    this.props.dispatch({
      type: types.REGISTRATION__REQUESTED,
      payload: {
        username,
        email,
        newPassword,
        newPasswordRepeated
      }
    })
  }

  render() {
    return (
      <RegistrationForm
        onSubmit={this.handleRegistration.bind(this)}
        isSubmitting={this.props.pageState.request.sendingRequest}
      />
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  pageState: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    pageState: state
  };
};

export default connect(
  mapStateToProps
)(
  withRouter(RegistrationPage)
);
