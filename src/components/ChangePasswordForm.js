import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button} from 'reactstrap';
import classNames from 'classnames';


const renderField = ({ input, label, type, meta: { touched, error } }) => {

  const formGroup = classNames(
    'form-group',
    {'has-danger': touched && error}
  );

  const formControlCss = classNames(
    'form-control',
    {'form-control-danger': touched && error}
  );

  return (
    <div className={formGroup}>
      <label className="form-control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className={formControlCss}/>
        {touched && error && <span className="form-control-feedback">{error}</span>}
      </div>
    </div>
  );
};

const ChangePasswordForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="form-change-password">

      <Field component={renderField}
             name="currentPassword"
             type="password"
             label="Current Password"
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
        {props.isSubmitting ?
          <span>Updating password...</span>
          :
          <span>Change Password</span>
        }
      </Button>
    </form>
  );

};

ChangePasswordForm.propTypes = {
  isSubmitting: React.PropTypes.bool.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'change-password'
})(ChangePasswordForm);
