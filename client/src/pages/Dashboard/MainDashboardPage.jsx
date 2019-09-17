import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js'



const Pointer = ({ onClick, name, status }) => {
  return (
    <div>
      <div
        onClick={() => onClick({ name, status })}
        role="tooltip"
        x-placement="top"
        style={{ top: '-77px', left: '-77px' }}
        className="fade show popover bs-popover-top p-2"
      >
        <i className="circular trash icon big animate" ></i>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default () => {
  const [bin, setBin] = useState(undefined);
  return (
    <div>
      <div className="googleMap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCBuMSPKaYOdjho5xbYDW6n_yjmSk_ZpRI' }}
          defaultCenter={{
            lat: 36.653767,
            lng: -121.79846,
          }}
          defaultZoom={19}
        >
          <Pointer
            name="ABC"
            status="Not Full"
            onClick={(data) =>setBin(data)}
            lat={36.654121}
            lng={-121.797348}
          />
          <Pointer name="DEF" status="Not full" onClick={(data) => setBin(data)} lat={36.654138} lng={-121.799875} />
          <Pointer name="HIJ" status="Not full" onClick={(data) => setBin(data)} lat={36.65357} lng={-121.79931} />
          <Pointer name="LMO" status="full" onClick={(data) => setBin(data)} lat={36.653368} lng={-121.79806} />
        </GoogleMapReact>
      </div>
      <Drawer
        drawerStyle={{ overflow: 'none', background: '#fff' }}
        right={'true'}
        open={!!bin}
        onChange={(e) => {
          if (!e) {
            setBin(undefined);
          }
        }}
      >
        {bin && 
        <div>

          <DrawerInfo 
            binName = {bin.name}
            binStatus = {bin.status}

          />
          
        </div>}
      </Drawer>
    </div>
  );
};
