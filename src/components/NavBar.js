import React, { Component } from "react";
import { Menu, Header } from "semantic-ui-react";

import CONFIG from "../config";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  state = {
    activeItem: undefined
  };

  handleMenuClick = (e, { path, name }) => {
    this.props.history.push(path);
    this.setState({ activeItem: name });
  };

  renderMenuItems = () =>
    CONFIG.menu.map((item, index) => (
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
