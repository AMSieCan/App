import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Environment from '../../utils/environment.js';

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
        <i className="circular trash icon big animate"></i>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default ({ match }) => {
  const institutionId = match.params.id;
  const [bin, setBin] = useState(undefined);
  const [devices, setDevices] = useState([]);

  // Get devices
  useEffect(() => {
    const getDevices = async () => {
      const result = await Axios.get(
        `${Environment.API_URL}/institutions/${institutionId}/devices`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      if (result.data) {
        setDevices(result.data);
      }
    };
    getDevices();
  }, []);

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
          {devices.map((device) => (
            <Pointer
              name={device.name}
              status={device.status}
              onClick={(data) => setBin(data)}
              lat={device.lat}
              lng={device.long}
              location={device.locationDescription}
            />
          ))}
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
        {bin && (
          <div>
            <DrawerInfo binName={bin.name} binStatus={bin.status} binLocation={bin.location} />
          </div>
        )}
      </Drawer>
    </div>
  );
};
