import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ProfileArea from '../components/ProfileArea';

class ProfilePage extends React.Component {

  componentDidMount() {
    const userId = this.props.pageState.auth.id;
  }

  render() {
    return (
      <div>
        <ProfileArea username="peter" emailAddress="peter@whatever.com"/>
      </div>
    );
  }

}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pageState: state
  }
}

export default connect(mapStateToProps)(ProfilePage);
