import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js';
import binData from '../../binData';
import ScheduledVisit from '../../layouts/ScheduledVisit';
import Map from './Map';
import { Grid } from 'semantic-ui-react';

const ServiceRequest = () => {
  return (
    <div style={{ margin: '15px' }}>
      <h1 style={{ color: 'grey' }}>Service Request Page</h1>
      <ScheduledVisit />
    </div>
  );
};

export default () => {
  return (
    <div>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={9}>
            <ServiceRequest />
          </Grid.Column>
          <Grid.Column width={6}>
            <Map style={{ height: '50px' }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
