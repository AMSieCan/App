import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';

const Pointer = ({ onClick, name }) => {
  return (
    <div>
      <div
        onClick={() => onClick({ name })}
        role="tooltip"
        x-placement="top"
        style={{ top: '-77px', left: '-77px' }}
        className="fade show popover bs-popover-top p-2"
      >
        <i className="trash icon big"></i>
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
            onClick={(data) =>setBin(data)}
            lat={36.654121}
            lng={-121.797348}
          />
          <Pointer name="DEF" onClick={(data) => setBin(data)} lat={36.654138} lng={-121.799875} />
          <Pointer name="HIJ" onClick={(data) => setBin(data)} lat={36.65357} lng={-121.79931} />
          <Pointer name="LMO" onClick={(data) => setBin(data)} lat={36.653368} lng={-121.79806} />
        </GoogleMapReact>
      </div>
      <Drawer
        drawerStyle={{ overflow: 'none', background: '#fff' }}
        open={!!bin}
        onChange={(e) => {
          if (!e) {
            setBin(undefined);
          }
        }}
      >
        {bin && <div>{bin.name}</div>}
      </Drawer>
    </div>
  );
};
