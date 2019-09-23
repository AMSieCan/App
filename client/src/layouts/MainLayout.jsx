import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const MainLayout = ({ children, history, advanced = true }) => {
  return (
    <div>
      <div>
        <Menu color="blue" inverted className="no-border">
          <Menu.Item>
            <Link to="/institutions/:id">
            <i class="trash icon" style={{ color: 'white' }}></i> AMSie Can
            </Link>
          </Menu.Item>
          {advanced && (
            <>
              <Link to="/institutions/:id">
                <Menu.Item name="Map" />
              </Link>
              <Link to="/institutions/:id/services">
                <Menu.Item name="Service" />
              </Link>
              <Link to="/institutions/:id/devices">
                <Menu.Item name="Devices" />
              </Link>
              <Link to="/institutions/:id/users">
                <Menu.Item name="Users" />
              </Link>
              <Link to="/institutions/:id/s2">
                <Menu.Item name="Help" />
              </Link>
            </>
          )}
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
