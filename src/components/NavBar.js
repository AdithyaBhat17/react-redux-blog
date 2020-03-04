import React, { Component } from 'react'
import { Menu, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import history from '../history';
import CONFIG from '../config';
import { logout } from '../actions';

const loginMenu = {
    title: 'Login',
    name: 'login',
    path: '/login'
}

const logoutMenu = {
    title: 'Logout',
    name: 'logout'
}

class NavBar extends Component {

    state = {
        activeItem: undefined
    }

    handleMenuClick = (e, { path, name }) => {
        path
            ? history.push(path)
            : this.props.logout();
        this.setState({ activeItem: name })
    }

    renderMenuItems = () => {
        const { isAuthenticated } = this.props;
        const menu = [...CONFIG.menu, isAuthenticated ? logoutMenu : loginMenu];
        return menu.map((item, index) => (
            <Menu.Item
                key={index}
                as='a'
                path={item.path}
                name={item.name}
                active={window.location.pathname === item.path || this.state.activeItem === item.name}
                onClick={this.handleMenuClick}
            >
                {item.title}
            </Menu.Item>
        ));
    }

    render() {
        return (
            <Menu borderless >
                <Menu.Item>
                    <Header as='h1'>BLOG</Header>
                </Menu.Item>
                <Menu.Menu position='right'>
                    {this.renderMenuItems()}
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    let { isAuthenticated } = auth;
    return {
        isAuthenticated
    };
}

export default connect(
    mapStateToProps,
    { logout }
)(NavBar)
