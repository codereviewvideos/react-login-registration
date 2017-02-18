import React, {PropTypes} from 'react';

const ProfileArea = (props) => {
  return (
    <div>
      <h1>Profile for {props.username}</h1>

      <ul>
        <li>Email address: {props.emailAddress}</li>
      </ul>
    </div>
  );
};

ProfileArea.propTypes = {
  username: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired
};

export default ProfileArea;
