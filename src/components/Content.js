import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";

import Feed from "./Feed";
import MyArticles from "./MyArticles";
import NewArticle from "./NewArticle";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import client from "../utils/firebase";
import { connect } from "react-redux";

import { userAuthenticated } from "../actions";

class Content extends Component {
  state = {
    isAuthenticated: false,
    user: null
  };
  componentDidMount() {
    this.observer = client.auth().onAuthStateChanged(user => {
      user && this.props.userAuthenticated(user);
    });
  }

  componentWillUnmount() {
    this.observer();
  }

  render() {
    let { isAuthenticated } = this.props;
    return (
      <Container>
        <Switch>
          <Route path="/" exact component={Feed} />
          <ProtectedRoute
            path="/articles"
            isAuthenticated={isAuthenticated}
            exact
            component={MyArticles}
          />
          <Route path="/articles/new" exact component={NewArticle} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  let { isAuthenticated, user } = auth;
  return {
    isAuthenticated,
    user
  };
};

export default connect(mapStateToProps, { userAuthenticated })(Content);
