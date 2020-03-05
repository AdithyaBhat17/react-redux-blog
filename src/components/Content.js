import React, { Component } from "react";
import { Container, Button } from "semantic-ui-react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Feed from "./Feed";
import MyArticles from "./MyArticles";
import NewArticle from "./NewArticle";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Article from "./Article";
import client from "../utils/firebase";

class Content extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    this.observer = client.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setAuthenticated(true);
        this.setState({
          user
        });
      } else {
        this.props.setAuthenticated(false);
        this.setState({ user: null });
      }
    });
  }

  componentWillUnmount() {
    this.observer();
  }

  render() {
    let { isAuthenticated, setAuthenticated } = this.props;
    return (
      <Container>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Feed} />
            <ProtectedRoute
              path="/articles"
              isAuthenticated={isAuthenticated}
              exact
              component={MyArticles}
            />
            <Route
              path="/articles/:articleId"
              render={props => (
                <Article
                  isAuthenticated={isAuthenticated}
                  setAuthenticated={setAuthenticated}
                  {...props}
                />
              )}
              exact
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path="/new"
              exact
              component={props => <NewArticle {...props} />}
            />
            <Route
              path="/login"
              exact
              render={props => (
                <Login
                  isAuthenticated={isAuthenticated}
                  setAuthenticated={setAuthenticated}
                  {...props}
                />
              )}
            />
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
        </BrowserRouter>
      </Container>
    );
  }
}

export default Content;
