import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const MainLayout = ({ children, history, advanced = true }) => {
  const institutionId = history.location.pathname.replace('/institutions', '').split('/')[1];
  return (
    <div>
      <div>
        <Menu color="blue" inverted className="no-border">
          <Menu.Item>
            <Link to={`/`}>
              <i class="trash icon" style={{ color: 'white' }}></i> AMSie Can
            </Link>
          </Menu.Item>
          {advanced && (
            <>
              <Link to={`/institutions/${institutionId}`}>
                <Menu.Item name="Map" />
              </Link>
              <Link to={`/institutions/${institutionId}/services`}>
                <Menu.Item name="Service" />
              </Link>
              <Link to={`/institutions/${institutionId}/devices`}>
                <Menu.Item name="Devices" />
              </Link>
              <Link to={`/institutions/${institutionId}/users`}>
                <Menu.Item name="Users" />
              </Link>
              <Link to={`/institutions/${institutionId}/help`}>
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
