import React, { Component, Fragment } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { userAuth } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    newUser: false,
    user: {
      email: "",
      password: ""
    }
  };

  handleInputChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  };

  handleAuth = async event => {
    event.preventDefault();
    let {
      newUser,
      user: { email, password }
    } = this.state;
    this.props.userAuth(newUser, email, password);
  };

  toggleAuthType = () =>
    this.setState(prevState => ({ newUser: !prevState.newUser }));

  render() {
    let {
      loading,
      message,
      location: { state: routeState },
      isAuthenticated
    } = this.props;
    let { newUser, user } = this.state;

    const { from } = routeState || { from: { pathname: "/articles" } };

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        {message?.text !== undefined ? (
          <Message error={message.error} success={!message.error}>
            {message.text}
          </Message>
        ) : null}
        <Form onSubmit={this.handleAuth} className="login-form">
          <Form.Field>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={this.handleInputChange}
              defaultValue={user.email}
              placeholder="mike.wazowski@gmail.com"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              onChange={this.handleInputChange}
              defaultValue={user.password}
              type="password"
            />
          </Form.Field>
          <Button type="submit" fluid color="black" loading={loading}>
            {newUser ? "SIGNUP" : "LOGIN"}
          </Button>
          <span onClick={() => this.toggleAuthType()} className="signup-link">
            {newUser
              ? "Already have an account? Login here."
              : "New here? click here to sign up."}
          </span>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  let { loading, message, isAuthenticated } = auth;
  return {
    loading,
    message,
    isAuthenticated
  };
};

export default connect(mapStateToProps, { userAuth })(Login);
