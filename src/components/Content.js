import React, { Component } from "react";
import { Container, Button } from "semantic-ui-react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Feed from "./Feed";
import MyArticles from "./MyArticles";
import NewArticle from "./NewArticle";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Article from "./Article";
import client from "../utils/firebase";

import { userAuthenticated } from "../actions";

class Content extends Component {
  state = {
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
          <Route path="/articles/:articleId" component={Article} exact />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/new"
            exact
            component={NewArticle}
          />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Link className="add-widget" to="new">
          <Button
            className="add-widget"
            circular
            color="black"
            icon="plus"
            size="huge"
          />
        </Link>
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
