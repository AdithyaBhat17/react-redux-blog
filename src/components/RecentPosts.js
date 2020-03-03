import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default ({ recent }) => (
  <Card>
    <Card.Content>
      <Card.Header as="h1">Recent Posts</Card.Header>
      {recent?.map(post => (
        <li key={post.id}>
          <Link to={`/articles/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </Card.Content>
  </Card>
);
