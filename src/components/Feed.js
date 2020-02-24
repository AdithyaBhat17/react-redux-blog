import React, { Component, Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';

import TagsCard from './TagsCard';
import ArticlesList from './ArticlesList';
import {
    getPublishedArticles,
    toggleTagsSelection,
    clearFilters
} from '../actions';
import { getPopularTags, getFilteredArticles } from '../utils';

class Feed extends Component {

    handleFilter = (tag) => {
        const { filterTags } = this.props;
        const isSelected = filterTags.indexOf(tag) === -1;
        this.props.toggleTagsSelection(tag, isSelected);
    }

    componentDidMount() {
        this.props.getPublishedArticles();
    }

    render() {
        const { articles, filterTags } = this.props;
        const tags = getPopularTags(articles);
        const filteredArticles = getFilteredArticles(articles, filterTags);
        return (
            <Fragment>
                <h3>Feed</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <TagsCard
                                tags={tags}
                                handleFilter={this.handleFilter}
                                selectedTags={filterTags}
                                clearFilters={this.props.clearFilters}
                            />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <ArticlesList articles={filteredArticles} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ articles }) => {
    return {
        articles: articles.published,
        filterTags: articles.filterTags
    }
}


export default connect(
    mapStateToProps,
    {
        getPublishedArticles,
        toggleTagsSelection,
        clearFilters
    }
)(Feed);