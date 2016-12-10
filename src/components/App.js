import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import "babel-es6-polyfill";
import NavBar from './NavBar';
import { Container, Row } from 'reactstrap';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>

        <NavBar
          auth={this.props.auth}
        />

        <Container className="content-wrapper">
          <Row>
            {this.props.children}
          </Row>
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps
)(App);
