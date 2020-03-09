import React, { Component } from "react";
import { Menu, Header } from "semantic-ui-react";

import CONFIG from "../config";
import client from "../utils/firebase";
import { withRouter } from "react-router-dom";

const loginMenu = {
  title: "Login",
  name: "login",
  path: "/login"
};

const logoutMenu = {
  title: "Logout",
  name: "logout"
};

class NavBar extends Component {
  state = {
    activeItem: undefined
  };

  handleMenuClick = async (e, { path, name }) => {
    path ? this.props.history.push(path) : await client.auth().signOut();
    this.setState({ activeItem: name });
  };

  renderMenuItems = () => {
    const { isAuthenticated } = this.props;
    const menu = [...CONFIG.menu, isAuthenticated ? logoutMenu : loginMenu];
    return menu.map((item, index) => (
      <Menu.Item
        key={index}
        as="a"
        path={item.path}
        name={item.name}
        active={
          window.location.pathname === item.path ||
          this.state.activeItem === item.name
        }
        onClick={this.handleMenuClick}
      >
        {item.title}
      </Menu.Item>
    ));
  };

  render() {
    return (
      <Menu borderless>
        <Menu.Item>
          <Header as="h1">BLOG</Header>
        </Menu.Item>
        <Menu.Menu position="right">{this.renderMenuItems()}</Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
