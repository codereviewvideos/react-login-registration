import React from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
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


const renderFields = (fields) => {
  const formGroup = classNames(
    'form-group',
    {'has-danger': fields.newPassword.meta.touched && fields.newPassword.meta.error}
  );

  const formControlCss = classNames(
    'form-control',
    {'form-control-danger': fields.newPassword.meta.touched && fields.newPassword.meta.error}
  );

  return (
    <div>
      <div className={formGroup}>
        <label className="form-control-label">New Password</label>
        <div className="input-row">
          <input {...fields.newPassword.input}
                 placeholder="New Password"
                 className={formControlCss}
                 type="password"/>
          {fields.newPassword.meta.touched && fields.newPassword.meta.error &&
          <span className="form-control-feedback">{fields.newPassword.meta.error}</span>}
        </div>
      </div>

      <div className={formGroup}>
        <label className="form-control-label">New Password Repeated</label>
        <div className="input-row">
          <input {...fields.newPasswordRepeated.input}
                 placeholder="New Password Repeated"
                 className={formControlCss}
                 type="password"/>
          {fields.newPasswordRepeated.meta.touched && fields.newPasswordRepeated.meta.error &&
          <span className="form-control-feedback">{fields.newPassword.meta.error}</span>}
        </div>
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

      <Fields names={[ 'newPassword', 'newPasswordRepeated' ]} component={renderFields}/>

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
