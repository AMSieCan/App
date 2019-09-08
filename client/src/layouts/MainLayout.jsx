import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const MainLayout = ({ children, history }) => {
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
          <Menu.Item
            name="Logout"
            onClick={() => {
              Cookies.remove('accessToken');
              history.push('/login');
            }}
          />
        </Menu>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default withRouter(MainLayout);
