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
        <div className="popover-body">TRASH BIN</div>
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
          lat: 37.56309621221321,
          lng: -122.31872069999997,
        }}
        defaultZoom={20}
      >
        <Pointer lat={37.56309621221321} lng={-122.31872069999997} />
        <Pointer lat={37.66309621221321} lng={-121.31872069999997} />
      </GoogleMapReact>
    </div>
  );
};
