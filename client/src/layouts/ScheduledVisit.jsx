import React from 'react';
import binData from "./../binData"




class ScheduledVisit extends React.Component {

	render() {
		
		   const binRequest = binData.map(bin=>{
		   		if(bin.setSchedule) {
		   			return (
						<tr>
								<td>{bin.name}</td>
								<td>{bin.locationDescription}</td>
								<td>{bin.status}%</td>
								<td class="collapsing">
									<div class="ui fitted slider checkbox">
           								<input type="checkbox" checked={bin.setSchedule}/> <label></label>
           							</div>
 								</td>
						</tr>
		   			)
		   		}
		   	})
		   
		return (
					<table class="ui celled striped table">
  					<thead>
    					<tr>
	      					<th>Serial Number</th>
      						<th>Location Description</th>
      						<th>Status</th>
      						<th>Service</th>
    					</tr>
  					</thead>
	  					<tbody>
							{binRequest}
						</tbody>
  					<tfoot class="full-width">
	    				<tr>
      						<th></th>
      						<th colspan="3">
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
				)
	}
}

export default ScheduledVisit
