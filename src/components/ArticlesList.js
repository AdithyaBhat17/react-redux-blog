import React from "react";
import { Card, Image } from "semantic-ui-react";

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
            <Card.Header as="h4">{article.title}</Card.Header>
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
