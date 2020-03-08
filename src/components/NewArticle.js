import React, { PureComponent, Fragment } from "react";
import { Form, Button, Header, Message } from "semantic-ui-react";
import { createNewArticle, setError, setLoading } from "../actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NewArticle extends PureComponent {
  state = {
    article: {
      published: false,
      title: "",
      tags: "",
      body_markdown: ""
    }
  };

  handleInputChange = event => {
    this.setState({
      article: {
        ...this.state.article,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let { article } = this.state;
    let { setError, createNewArticle, setLoading } = this.props;

    if (!article.title.trim()) {
      setError("Please give your article a title 😞");
      return;
    }
    if (!article.body_markdown.trim()) {
      setError("I've never seen an article without any content 😠");
      return;
    }

    setLoading(true);

    try {
      let tags = article.tags?.split(",").map(tag => tag.trim());
      createNewArticle({ article: { ...article, tags } });
    } catch (error) {
      console.error(error);
      setError(error || "Oops... something went wrong 😞");
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.created !== this.props.created && this.props.created)
      this.props.history.push("/articles");
  }

  render() {
    let { article } = this.state;
    const { error, loading } = this.props;

    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          New article!
        </Header>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Field>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              onChange={this.handleInputChange}
              defaultValue={article.title}
              placeholder="React > Angular"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="tags">Tags (comma separated list)</label>
            <input
              name="tags"
              onChange={this.handleInputChange}
              placeholder="JavaScript, react, angular"
              defaultValue={article.tags}
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="body_markdown">Content</label>
            <textarea
              name="body_markdown"
              onChange={this.handleInputChange}
              placeholder="Your content here (Markdown is supported)"
              defaultValue={article.body_markdown}
              type="text"
            />
          </Form.Field>
          <Button
            size="large"
            type="submit"
            fluid
            color="black"
            loading={loading}
          >
            SAVE
          </Button>
        </Form>
        {error ? (
          <Message as="p" className="form-message" error={error ? true : false}>
            {error}
          </Message>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ articles }) => ({
  error: articles.error,
  loading: articles.loading,
  created: articles.created
});

export default withRouter(
  connect(mapStateToProps, { setError, createNewArticle, setLoading })(
    NewArticle
  )
);
