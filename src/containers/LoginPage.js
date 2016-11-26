import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from '../components/LoginForm';
import * as types from '../constants/actionTypes';

class LoginPage extends Component {

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


export default connect()(LoginPage);
