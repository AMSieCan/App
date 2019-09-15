import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';

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
          <Pointer name="LMO" status="Not full" onClick={(data) => setBin(data)} lat={36.653368} lng={-121.79806} />
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
          <div class="ui list" style={{padding: '20px'}} >
            <div class="item" >
              <div class="header"><h3>Unit Information: 
              <h3>{bin.name}</h3></h3>
              </div>
                 <div class="header">Location Description</div>
                 (description)
                 <div class="header">Last Visited</div>
                 (Days ago)
                 <div class="header">Current Status</div>
                 (10% used)
                 <p>{bin.status}</p>
                 <div class="header">Equipment Info</div>
                 (Battery OK)
                 (Status OK)
                 <div class="header">Serial Info</div>
                 (1234ABCD)
            </div>
            <div class="item">
              <div class="header"><h4>Maintenance</h4></div>
                <div class="header"><a href="">Schedule Visit</a></div>
                <div class="header"><a href=""> Current Scheduled Reports</a></div>
                <div class="header"><a href="">All Unit Status and Configuration</a></div>
              </div>
            </div>

          
          
        </div>}
      </Drawer>
    </div>
  );
};
