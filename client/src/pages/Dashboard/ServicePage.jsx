import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js'
import binData from "../../binData"
import ScheduledVisit from "../../layouts/ScheduledVisit"



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
  	<div>
  		<h1>hello</h1>
  		<ServiceRequest />
  	</div>
  )
}
