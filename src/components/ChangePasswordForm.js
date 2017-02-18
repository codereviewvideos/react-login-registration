import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button} from 'reactstrap';

const ChangePasswordForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="form-change-password">

      <Field component="input"
             name="currentPassword"
             type="password"
             placeholder="Current Password"
             required="required"
             className="form-control"
      />

      <Field component="input"
             name="newPassword"
             type="password"
             placeholder="New Password"
             required="required"
             className="form-control"
      />

      <Field component="input"
             name="newPasswordRepeated"
             type="password"
             placeholder="New Password Repeated"
             required="required"
             className="form-control"
      />

      <Button type="submit"
              size="lg"
              block
              color="success"
      >
        Change Password
      </Button>
    </form>
  );

};

ChangePasswordForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'change-password'
})(ChangePasswordForm);
