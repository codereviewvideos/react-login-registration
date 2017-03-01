import React from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import {Button} from 'reactstrap';
import FormField from './FormField';
import FormPasswordRepeatedFields from './FormPasswordRepeatedFields';


const ChangePasswordForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="form-change-password">

      <Field component={FormField}
             name="currentPassword"
             type="password"
             label="Current Password"
             placeholder="Current Password"
             required="required"
             className="form-control"
      />

      <Fields names={[ 'newPassword', 'newPasswordRepeated' ]} component={FormPasswordRepeatedFields}/>

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
  handleSubmit: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'change-password'
})(ChangePasswordForm);
