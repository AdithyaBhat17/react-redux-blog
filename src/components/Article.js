import React, { Component } from 'react';
import { Grid, Container, Divider, Comment, Header, Card, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getArticle, clearCurrentArticle } from '../actions';

class Article extends Component {

    componentDidMount() {
        const { articleId } = this.props.computedMatch.params;
        this.props.getArticle(articleId);
    }

    componentWillUnmount() {
        this.props.clearCurrentArticle();
    }

    renderTags = () => {
        const { article } = this.props;
        return article?.tags?.map(tag => <Label color='blue' horizontal>{`#${tag}`}</Label>)
    }

    render() {
        const { article } = this.props;
        return (
            <Grid>
                <Grid.Column width={12}>
                    <Header className="article-page-title" as='h1'>{article?.title}</Header>
                    {this.renderTags()}
                    <Divider />
                    <Container textAlign='justified'>
                        <div dangerouslySetInnerHTML={{ __html: article?.body_html }} />
                    </Container>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Card>
                        <Card.Content header='Author' />
                        <Card.Content>
                            <Grid>
                                <Grid.Column width={4}>
                                    <Comment.Avatar src={article?.user?.profile_image} />
                                </Grid.Column>
                                <Grid.Column width={12} textAlign='right'>
                                    <Comment.Author>{article?.user?.name}</Comment.Author>
                                    <Comment.Metadata className="date">{article?.readable_publish_date}</Comment.Metadata>
                                </Grid.Column>
                            </Grid>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' /> {article?.user?.username}
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = ({ articles }) => {
    return {
        article: articles.current
    }
}

export default connect(
    mapStateToProps,
    { getArticle, clearCurrentArticle }
)(Article);
