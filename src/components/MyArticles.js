import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import { getUserArticles } from "../actions";
import ArticlesList from "./ArticlesList";

class MyArticles extends Component {
  componentDidMount() {
    this.props.getUserArticles();
  }

  render() {
    const { articles } = this.props;

    return (
      <Fragment>
        <h3>My Articles</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <ArticlesList articles={articles} />
            </Grid.Column>
            <Grid.Column width={4}>{/* @todo Recent Posts Card */}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

function mapStateToProps({ articles }) {
  return {
    articles: articles.user
  };
}

export default connect(mapStateToProps, { getUserArticles })(MyArticles);
