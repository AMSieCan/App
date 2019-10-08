import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Environment from '../../utils/environment.js';
import { Loader } from 'semantic-ui-react';

const Pointer = ({ onClick, name, status, location }) => {
  var color = 'green';
  if (status > 80) color = 'red';
  // Determine the bin's CSS color.
  else if (status > 50) color = 'orange';
  return (
    <div>
      <div
        onClick={() => onClick({ name, status, location })}
        role="tooltip"
        x-placement="top"
        style={{ top: '-77px', left: '-77px' }}
        className="fade show popover bs-popover-top p-2"
      >
        <i className="circular trash icon big animate" rel={color}></i>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [institution, setInstitution] = useState(undefined);
  const institutionId = match.params.id;
  const [bin, setBin] = useState(undefined);
  const [devices, setDevices] = useState([]);

  // Get devices and institution data
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
    const getInstitutionData = async () => {
      const result = await Axios.get(`${Environment.API_URL}/institutions/${institutionId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      if (result.data) {
        setInstitution(result.data);
      }
    };
    getInstitutionData();
    getDevices();

    setLoading(false);
  }, []);

  if (loading || !institution) {
    return <Loader />;
  }

  return (
    <div>
      <div className="googleMap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCBuMSPKaYOdjho5xbYDW6n_yjmSk_ZpRI' }}
          defaultCenter={{
            lat: institution.lat,
            lng: institution.long,
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
