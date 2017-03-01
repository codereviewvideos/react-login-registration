import React from 'react';
import classNames from 'classnames';

const formField = ({ input, label, type, meta: { touched, error } }) => {

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

formField.propTypes = {
  input: React.PropTypes.object.isRequired,
  meta: React.PropTypes.object.isRequired,
  type: React.PropTypes.string.isRequired,
  label: React.PropTypes.string
};

export default formField;
