import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js'
import binData from '../../binData'



const Pointer = ({ onClick, name, status, location }) => {
  return (
    <div>
      <div
        onClick={() => onClick({ name, status, location })}
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
            name={binData[0].name}
            status={binData[0].status}
            onClick={(data) =>setBin(data)}
            lat={binData[0].lat}
            lng={binData[0].long}
            location={binData[0].locationDescription}
          />
          <Pointer name={binData[1].name} status={binData[1].status} onClick={(data) => setBin(data)} lat={binData[1].lat} lng={binData[1].long} location={binData[1].locationDescription}/>
          <Pointer name={binData[2].name} status={binData[2].status} onClick={(data) => setBin(data)} lat={binData[2].lat} lng={binData[2].long} location={binData[2].locationDescription}/>
          <Pointer name={binData[3].name} status={binData[3].status} onClick={(data) => setBin(data)} lat={binData[3].lat} lng={binData[3].long} location={binData[3].locationDescription}/>
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
            binLocation = {bin.location}
          />
          
          
        </div>}
      </Drawer>
    </div>
  );
};
