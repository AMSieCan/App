import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default ({ children }) => {
  return (
    <div>
      <div>
        <Menu>
          <Link to="/">
            <Menu.Item name="editorials" />
          </Link>
          <Link to="/s">
            <Menu.Item name="editorials" />
          </Link>
          <Link to="/s2">
            <Menu.Item name="editorials" />
          </Link>
        </Menu>
      </div>
      <div>{children}</div>
    </div>
  );
};
