import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer'



// you can use this library
// https://github.com/stoeffel/react-motion-drawer
// just do `yarn add react-motion-drawer`

//then you can import the drawer into the comonent to use
// you can add it in MainDashboardPage

// then create a state to toggle the drawer

// const [bin, setBin] = useState({});

// Add a click event listener to your trash bin 
// and trigger the setBin({ data here })
// the drawer you can do somehting like 
// <Drawer open={bin} onChange={(} => setBin(undefined)}>
// so when drawer close you can reset the bin state





const Pointer = (params) => {
  const [bin, setBin] = useState("empty");

  return (
    <div>
        <div
          role="tooltip"
          x-placement="top"
          style={{ top: '-77px', left: '-77px' }}
          className="fade show popover bs-popover-top p-2"
          onClick={()=>setBin("trash full")}
          >
          <i class="trash icon big">Bin</i>
        </div>

        <h1>{bin}</h1>
      
        <div>
          <Drawer open={bin} onChange={()=>setBin(undefined)}>
            <ul>
              <li>home</li>
              <li>about</li>
              <li>settings</li>
            </ul>
          </Drawer>
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

