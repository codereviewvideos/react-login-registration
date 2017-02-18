import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import LoginForm from '../components/LoginForm';
import * as types from '../constants/actionTypes';
import '../styles/login-page.scss';

class LoginPage extends Component {

  componentWillReceiveProps(newProps) {
    if (newProps.pageState.auth.isAuthenticated) {
      this.props.router.replace('/');
    }
  }

  doLogin(formData) {
    this.props.dispatch({
      type: types.LOGIN__REQUESTED,
      payload: {
        username: formData.username,
        password: formData.password
      }
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.doLogin.bind(this)}
        isSubmitting={this.props.pageState.request.sendingRequest}
      />
    );
  }
}

LoginPage.propTypes = {
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
  withRouter(LoginPage)
);
