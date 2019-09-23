import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import enviroment from '../utils/enviroment';
import { Redirect, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainLayout from '../layouts/MainLayout';
import MainDashboardPage from './Dashboard/MainDashboardPage';
import ServicePage from './Dashboard/ServicePage';
import DevicesPage from './Dashboard/DevicesPage';
import UsersPage from './Dashboard/UsersPage';
import InstitutionsPage from './InstitutionsPage';

export default () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Axios.get(`${enviroment.API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        });
        setUser(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Cookies.remove('accessToken');
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <MainLayout>
      <Switch>
        <Route path="/institutions/:id" exact component={MainDashboardPage} />
        <Route path="/institutions/:services" exact component={ServicePage} />
        <Route path="/institutions/:id/devices" exact component={DevicesPage} />
        <Route path="/institutions/:id/users" exact component={UsersPage} />
      </Switch>
    </MainLayout>
  );
};
