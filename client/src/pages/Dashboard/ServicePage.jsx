import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js'
import binData from "../../binData"
import ScheduledVisit from "../../layouts/ScheduledVisit"
import Map from "./Map"



class ServiceRequest extends React.Component {
	render() {
		return(
			<div style={{margin: '15px'}}>
				<h1 style={{color: 'grey'}}>Service Request Page</h1>
				

              <ScheduledVisit />
	    				
  					
			</div>
		)
	}
}

export default () => {
  
  return (
  	<div className="ui grid">
      <div className="six wide column">
    		
    		<ServiceRequest />
      </div>
      <div className="ten wide column">
        
        <Map style={{height: "50px"}} />
        
      </div>
  	</div>
  )
}
