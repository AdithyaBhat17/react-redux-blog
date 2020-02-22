import React, { Component } from 'react'
import { Container } from 'semantic-ui-react';
import { Router } from 'react-router-dom';

import NavBar from './NavBar';
import Content from './Content';
import history from '../history';

export default class App extends Component {
    render() {
        return (
            <Container fluid>
                <Router history={history}>
                    <NavBar />
                    <Content />
                </Router>
            </Container>
        )
    }
}
