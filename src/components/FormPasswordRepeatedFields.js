import React from 'react';
import classNames from 'classnames';

const FormPasswordRepeatedFields = (fields) => {
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

FormPasswordRepeatedFields.propTypes = {
  fields: React.PropTypes.object.isRequired
};

export default FormPasswordRepeatedFields;
