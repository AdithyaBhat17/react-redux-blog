import React, { Component, Fragment } from "react";
import { Grid } from "semantic-ui-react";

import ArticlesList from "./ArticlesList";
import RecentPosts from "./RecentPosts";
import { fetcher } from "../api";

class MyArticles extends Component {
  state = {
    articles: [],
    recent: []
  };

  getUserArticles = () => {
    fetcher(
      "https://corsanywhere.herokuapp.com/https://dev.to/api/articles/me/all"
    )
      .then(articles => this.setState({ articles }))
      .catch(error => console.error(error) || this.setState({ articles: [] }));
  };

  getPublishedArticles = () => {
    fetcher("https://corsanywhere.herokuapp.com/https://dev.to/api/articles/")
      .then(recent => this.setState({ recent }))
      .catch(error => console.error(error) || this.setState({ recent: [] }));
  };

  componentDidMount() {
    this.getUserArticles();
    this.getPublishedArticles();
  }

  render() {
    const { articles, recent } = this.state;

    return (
      <Fragment>
        <h3>My Articles</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <ArticlesList articles={articles} />
            </Grid.Column>
            <Grid.Column width={4}>
              <RecentPosts recent={recent} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default MyArticles;
