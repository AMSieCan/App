import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

// <img src={require('../graphicResources')} />


const HomePage = ({ children, history, advanced = true }) => {
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
          
              <div className="right menu">
                <Link to={`/institutions/${institutionId}`}>
                  <Menu.Item name="Login" />
                </Link>
                <Link to={`/institutions/${institutionId}/services`}>
                  <Menu.Item name="Sign Up" />
                </Link>
              </div>
        </Menu>  

      </div>
      <section style={{  
                        backgroundImage: `url("../graphicResources/map.png")`,
                        height: "1000px",
                        background: "yellow" 
 
                    }} >

      </section>
    </div>
  );
};

export default withRouter(HomePage);
