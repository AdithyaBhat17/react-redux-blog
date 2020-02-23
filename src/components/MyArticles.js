import React, { Component, Fragment } from "react";
import { getUserArticles } from "../actions/articles";
import { connect } from "react-redux";
import { Card, Grid } from "semantic-ui-react";

class MyArticles extends Component {
  componentDidMount() {
    this.props.getUserArticles(
      "https://cors-anywhere.herokuapp.com/https://dev.to/api/articles?username=ben",
      "GET"
    );
  }

  getPopularTags = () => {
    let tags = [];
    try {
      this.props.articles.forEach(
        article => (tags = [...new Set([...tags, ...article.tag_list])])
      );
      return tags?.map((tag, index) => (
        <Card.Content key={index}>
          <p>#{tag}</p>
        </Card.Content>
      ));
    } catch (error) {
      console.error("Error while fetching your popular tags :(", error);
      return tags;
    }
  };

  getCardDetails = article => (
    <Card key={article.id} fluid>
      <Card.Content>
        <Card.Header as="h4">{article.title}</Card.Header>
        <Card.Meta>
          {article.tag_list?.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </Card.Meta>
      </Card.Content>
    </Card>
  );

  render() {
    return (
      <Fragment>
        <h3>My Articles</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Card.Group>
                {this.props.articles?.map(article =>
                  this.getCardDetails(article)
                ) ?? null}
              </Card.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header as="h6">Trending topics for you</Card.Header>
                  {this.getPopularTags() ?? null}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles.articles
  };
}

const mapDispatchToProps = {
  getUserArticles
};

export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);
