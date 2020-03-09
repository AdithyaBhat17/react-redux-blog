import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./NavBar";
import Content from "./Content";

export default class App extends Component {
  render() {
    return (
      <Container fluid>
        <Router>
          <NavBar />
          <Content />
        </Router>
      </Container>
    );
  }
}
