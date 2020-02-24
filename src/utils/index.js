export const getPopularTags = (articles = []) => {
    let tags = [];
    articles.forEach(
        article => (tags = [...new Set([...tags, ...article.tag_list])])
    );
    return tags;
}

export const getFilteredArticles = (articles, tags) => {
    const filteredArticles = tags.length !== 0
        ? articles?.filter(article =>
            article.tag_list.some(tag =>
                tags.includes(tag)
            )
        )
        : articles;
    return filteredArticles;
}