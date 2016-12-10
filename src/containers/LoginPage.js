import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import LoginForm from '../components/LoginForm';
import * as types from '../constants/actionTypes';

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
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    pageState: state
  }
};

LoginPage = withRouter(LoginPage);

export default connect(mapStateToProps)(LoginPage);
