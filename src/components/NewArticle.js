import React, { Component, Fragment } from "react";
import { Form, Button, Header, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

export default withRouter(
  class NewArticle extends Component {
    state = {
      loading: false,
      message: {
        error: false,
        text: ""
      },
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
      if (!article.title.trim()) {
        this.setState({
          message: { error: true, text: "Please give your article a title 😞" }
        });
        return;
      }
      if (!article.body_markdown.trim()) {
        this.setState({
          message: {
            error: true,
            text: "I've never seen an article without any content 😠"
          }
        });
        return;
      }
      this.setState({ loading: true });

      try {
        let tags = article.tags?.split(",").map(tag => tag.trim());
        await fetch(
          "https://corsanywhere.herokuapp.com/https://dev.to/api/articles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.REACT_APP_API_KEY
            },
            body: JSON.stringify({
              ...article,
              tags
            })
          }
        );
        this.props.history.push("/articles");
      } catch (error) {
        console.log(error);
        this.setState({
          loading: false,
          message: {
            error: true,
            text: error.message || "Oops... something went wrong 😭"
          }
        });
      }
    };

    render() {
      let { loading, article, message } = this.state;
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
          {message?.text ? (
            <Message
              as="p"
              className="form-message"
              error={message.error}
              success={!message.error}
            >
              {message.text}
            </Message>
          ) : null}
        </Fragment>
      );
    }
  }
);
