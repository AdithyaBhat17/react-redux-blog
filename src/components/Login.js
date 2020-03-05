import React, { Component, Fragment } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import client from "../utils/firebase";

class Login extends Component {
  state = {
    loading: false,
    newUser: false,
    user: {
      email: "",
      password: ""
    },
    message: {
      error: false,
      text: ""
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

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleAuth = async event => {
    event.preventDefault();
    let {
      newUser,
      user: { email, password }
    } = this.state;

    this.setState({ loading: true });

    try {
      if (newUser) {
        await client.auth().createUserWithEmailAndPassword(email, password);
        this.props.setAuthenticated(true);
      } else {
        await client.auth().signInWithEmailAndPassword(email, password);
        this.props.setAuthenticated(true);
      }
    } catch (error) {
      this.setState({ message: { error: true, text: error.message } });
    }
    this._mounted && this.setState({ loading: false });
  };

  toggleAuthType = () =>
    this.setState(prevState => ({ newUser: !prevState.newUser }));

  render() {
    let { loading, message, newUser, user } = this.state;

    let {
      isAuthenticated,
      location: { state: routeState }
    } = this.props;

    const { from } = routeState || { from: { pathname: "/articles" } };

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        {message?.text ? (
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

export default Login;
