import React, {Component} from 'react';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {

  doLogin(formData) {
    console.log('form data was received', formData);
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.doLogin.bind(this)}
      />
    );
  }

}


export default LoginPage;
