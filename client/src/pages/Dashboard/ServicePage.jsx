import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from 'react-motion-drawer';
import DrawerInfo from '../../layouts/DrawerInfo.js'
import binData from "../../binData"



class ServiceRequest extends React.Component {
	render() {
		return(
			<div>
				<h1>Service Request Page</h1>
        <p>{binData[0].name}</p>
				<table class="ui compact celled definition table">
  					<thead>
    					<tr>
	      					<th>Serial Number</th>
      						<th>Location Description</th>
      						<th>Status</th>
      						<th>Service</th>
    					</tr>
  					</thead>
  					<tbody>
	    				<tr>
      						<td>3b003b001747373333353132</td>
      						<td>Student Store</td>
      						<td>80%</td>
      						<td class="collapsing">
	        					<div class="ui fitted slider checkbox">
          							<input type="checkbox"/> <label></label>
        						</div>
      						</td>
    					</tr>
						<tr>
	      					<td>2222</td>
      						<td>Cafeteria</td>
      						<td>20%</td>
      						<td class="collapsing">
	        					<div class="ui fitted slider checkbox">
          							<input type="checkbox"/> <label></label>
        						</div>
      						</td>
    					</tr>
						<tr>
	      					<td>3333</td>
      						<td>North Parking Lot</td>
      						<td>100%</td>
      						<td class="collapsing">
	        					<div class="ui fitted slider checkbox">
          							<input type="checkbox"/> <label></label>
        						</div>
      						</td>
    					</tr>
  					</tbody>
  					<tfoot class="full-width">
	    				<tr>
      						<th></th>
      						<th colspan="4">
	        					<div class="ui right floated small primary labeled icon button">
		        					<i class="user icon"></i> Request
        						</div>
        						<div class="ui small button">
				          			Approve
        						</div>
        						<div class="ui small disabled button">
			          				Approve All
        						</div>
      						</th>
    					</tr>
  					</tfoot>
				</table>
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
