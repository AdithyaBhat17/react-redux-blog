import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Router } from "react-router-dom";

import NavBar from "./NavBar";
import Content from "./Content";
import history from "../history";

export default class App extends Component {
  // lifting state up.
  state = {
    isAuthenticated: false
  };

  setAuthenticated = isAuthenticated => {
    this.setState({ isAuthenticated });
  };

  render() {
    let { isAuthenticated } = this.state;
    return (
      <Container fluid>
        <Router history={history}>
          <NavBar
            isAuthenticated={isAuthenticated}
            setAuthenticated={this.setAuthenticated}
          />
          <Content
            isAuthenticated={isAuthenticated}
            setAuthenticated={this.setAuthenticated}
          />
        </Router>
      </Container>
    );
  }
}
