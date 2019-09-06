import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import enviroment from '../utils/enviroment';
import { Redirect, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainLayout from '../layouts/MainLayout';
import MainDashboardPage from './Dashboard/MainDashboardPage';

export default () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Axios.get(`${enviroment.API_URL}/me`, {
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

  if (user.role !== 'ADMIN') {
    alert('Missing admin role');
    return <Redirect to="/login" />;
  }
  return (
    <MainLayout>
      <Switch>
        <Route path="/" exact component={MainDashboardPage} />
        <Route path="/s" exact component={MainDashboardPage} />
        <Route path="/s1" exact component={MainDashboardPage} />
      </Switch>
    </MainLayout>
  );
};
