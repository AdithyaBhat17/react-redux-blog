import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from "react-router-dom";

import Feed from './Feed';
import MyArticles from './MyArticles';
import NewArticle from './NewArticle';
import Login from './Login';

export default class Content extends Component {
    render() {
        return (
            <Container>
                <Switch>
                    <Route path="/" exact component={Feed} />
                    <Route path="/articles" exact component={MyArticles} />
                    <Route path="/new" exact component={NewArticle} />
                    <Route path="/login" exact component={Login} />
                </Switch>
            </Container>
        )
    }
}
