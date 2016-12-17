import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as types from '../constants/actionTypes';

class LogoutPage extends Component {

  componentWillMount() {
    this.props.dispatch({
      type: types.LOGOUT__REQUESTED
    });
  }

  render() {
    return null;
  }
}

LogoutPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(LogoutPage);
