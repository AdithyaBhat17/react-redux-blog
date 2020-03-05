import React, { Component } from "react";
import {
  Grid,
  Container,
  Divider,
  Comment,
  Header,
  Card,
  Icon,
  Label
} from "semantic-ui-react";
import { fetcher } from "../api";

class Article extends Component {
  state = {
    article: null
  };

  componentDidMount() {
    const {
      match: {
        params: { articleId }
      }
    } = this.props;
    fetcher(
      `https://cors-anywhere.herokuapp.com/https://dev.to/api/articles/${articleId}`
    )
      .then(article => this.setState({ article }))
      .catch(error => {
        throw new Error(error);
      });
  }

  renderTags = () => {
    const { article } = this.state;
    return article?.tags?.map((tag, index) => (
      <Label key={index} color="blue" horizontal>{`#${tag}`}</Label>
    ));
  };

  render() {
    const { article } = this.state;
    return (
      <Grid>
        <Grid.Column width={12}>
          <Header className="article-page-title" as="h1">
            {article?.title}
          </Header>
          {this.renderTags()}
          <Divider />
          <Container textAlign="justified">
            <div dangerouslySetInnerHTML={{ __html: article?.body_html }} />
          </Container>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card>
            <Card.Content header="Author" />
            <Card.Content>
              <Grid>
                <Grid.Column width={4}>
                  <Comment.Avatar src={article?.user?.profile_image} />
                </Grid.Column>
                <Grid.Column width={12} textAlign="right">
                  <Comment.Author>{article?.user?.name}</Comment.Author>
                  <Comment.Metadata className="date">
                    {article?.readable_publish_date}
                  </Comment.Metadata>
                </Grid.Column>
              </Grid>
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" /> {article?.user?.username}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Article;
