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
            <Link to={`/institutions/${institutionId}`}>
              <i className="trash icon" style={{ color: 'white' }}></i> AMSie Can
            </Link>
          </Menu.Item>
          {advanced && (
            <>
              <Link to={`/institutions/${institutionId}`}>
                <Menu.Item name="Map" icon="map" />
              </Link>
              <Link to={`/institutions/${institutionId}/services`}>
                <Menu.Item name="Service" icon="clipboard list" />
              </Link>
              <Link to={`/institutions/${institutionId}/devices`}>
                <Menu.Item name="Devices" icon="microchip" />
              </Link>
              <Link to={`/institutions/${institutionId}/users`}>
                <Menu.Item name="Users" icon="users" />
              </Link>
              <Link to={`/institutions/${institutionId}/settings`}>
                <Menu.Item name="Settings" icon="settings" />
              </Link>
              <Link to={'/login'} onClick={() => { Cookies.remove('accessToken'); }}>
                <Menu.Item name="Logout" icon="log out" />
              </Link>
            </>
          )}
        </Menu>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default withRouter(MainLayout);
