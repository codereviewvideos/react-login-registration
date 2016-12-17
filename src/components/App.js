import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import "babel-es6-polyfill";
import NavBar from './NavBar';
import font from 'font-awesome/css/font-awesome.css'; // eslint-disable-line
import {Container, Row} from 'reactstrap';

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
  auth: PropTypes.object.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps
)(App);
