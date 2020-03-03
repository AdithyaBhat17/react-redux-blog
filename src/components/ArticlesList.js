import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const ArticlesList = ({ articles }) => {
  return (
    <Card.Group>
      {articles?.map(article => (
        <Card key={article.id} fluid>
          <Card.Content>
            <Image
              floated="left"
              size="mini"
              src={article.user?.profile_image}
            />
            <Card.Header as="h4">
              <Link
                className={article.published === false && 'article-title'}
                to={article.published !== false && `/articles/${article.id}`}
              >
                {article.title}
              </Link>
            </Card.Header>
            <Card.Meta>
              {article.tag_list?.map((tag, index) => (
                <span key={index}>#{tag}</span>
              ))}
            </Card.Meta>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default ArticlesList;
