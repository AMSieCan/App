import React from 'react';
import GoogleMapReact from 'google-map-react';

const Pointer = (params) => {
  return (
    <div>
      <div
        role="tooltip"
        x-placement="top"
        style={{ top: '-77px', left: '-77px' }}
        className="fade show popover bs-popover-top p-2"
      >
        <i class="trash icon big">Bin</i>
      </div>
    </div>
  );
};

export default () => {
  return (
    <div className="googleMap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCBuMSPKaYOdjho5xbYDW6n_yjmSk_ZpRI' }}
        defaultCenter={{
          lat: 36.653767,
          lng: -121.798460,
        }}
        defaultZoom={19}
      >
        <Pointer lat={36.654121} lng={-121.797348} />
        <Pointer lat={36.654138} lng={-121.799875} />
        <Pointer lat={36.653570} lng={-121.799310} />
        <Pointer lat={36.653368} lng={-121.798060} />
      </GoogleMapReact>
    </div>
  );
};
