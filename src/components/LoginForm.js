import React from 'react';
import {Field, reduxForm} from 'redux-form';

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>

      <Field component="input"
             name="username"
             id="username"
             type="text"
             placeholder="Username or email address"
             required="required"
      />

      <Field component="input"
             name="password"
             id="password"
             type="password"
             placeholder="Password"
             required="required"
      />

      <button type="submit">
        Login
      </button>
    </form>
  );

};

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default reduxForm({
  form: 'login'
})(LoginForm);
