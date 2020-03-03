import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import { getUserArticles, getPublishedArticles } from "../actions";
import ArticlesList from "./ArticlesList";
import RecentPosts from "./RecentPosts";

class MyArticles extends Component {
  componentDidMount() {
    this.props.getUserArticles();
    this.props.getPublishedArticles();
  }

  render() {
    const { articles, recent } = this.props;

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

function mapStateToProps({ articles }) {
  return {
    articles: articles.user,
    recent: articles.published
  };
}

export default connect(mapStateToProps, {
  getUserArticles,
  getPublishedArticles
})(MyArticles);
