import React from 'react';
import { List, Menu, Card, Image, Icon } from 'semantic-ui-react';

export default ({ counter }) => {
  return (
    <div>
      <Card>
        <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>{counter}</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </Card>
      <h1>Current counter: {counter}</h1>
    </div>
  );
};
