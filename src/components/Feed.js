import React, { Component, Fragment } from "react";
import { Grid } from "semantic-ui-react";

import TagsCard from "./TagsCard";
import ArticlesList from "./ArticlesList";
import { getPopularTags, getFilteredArticles } from "../utils";
import { fetcher } from "../api";

class Feed extends Component {
  state = {
    tags: [],
    articles: [],
    filterTags: []
  };

  toggleTagsSelection = tag => {
    let { filterTags } = this.state;
    const isSelected = filterTags.indexOf(tag) === -1;
    if (isSelected) {
      filterTags.push(tag);
    } else {
      filterTags = filterTags.filter(filteredTag => filteredTag !== tag);
    }
    this.setState({ filterTags });
  };

  clearFilters = () => this.setState({ filterTags: [] });

  componentDidMount() {
    fetcher(
      "https://cors-anywhere.herokuapp.com/https://dev.to/api/articles"
    ).then(articles => {
      const tags = getPopularTags(articles);
      this.setState({ articles, tags })
    });
  }

  render() {
    const { articles, filterTags } = this.state;
    const filteredArticles = getFilteredArticles(articles, filterTags);
    return (
      <Fragment>
        <h3>Feed</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <TagsCard
                tags={this.state.tags}
                handleFilter={this.toggleTagsSelection}
                selectedTags={filterTags}
                clearFilters={this.clearFilters}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <ArticlesList articles={filteredArticles} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default Feed;
