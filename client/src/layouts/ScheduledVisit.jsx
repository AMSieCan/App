import React from 'react';
import binData from "./../binData"




class ScheduledVisit extends React.Component {
	 constructor() {
	    super()
    
    	this.state = {
    		binInfo: binData
    	
    	}

    	this.handleChange = this.handleChange.bind(this)
  	}

 
	  handleChange(name){
	  	this.setState(prevState => {
	            const updatedBinData = prevState.binInfo.map(bin => {
	                if (bin.name === name) {
	                    bin.setSchedule = !bin.setSchedule
	                    console.log("set schedule " + bin.setSchedule)
	                   
	                }
	                return bin
	            })

	            return {
	                binInfo: updatedBinData
	            }
	        })
	  }

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
           								<input 	id={bin.name} type="checkbox" 
           										checked={bin.setSchedule}
           										onChange={() => this.handleChange(bin.name)}
           								/> 

           								<label></label>
           							</div>
 								</td>
						</tr>
		   			)
		   		}

		   	})


		   
		   
		return (
				<div>
					<table class="ui very basic table">
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
		        					<i class="user icon"></i> Refresh Report
        						</div>

        						
      						</th>
    					</tr>
  					</tfoot>
				</table>
				</div>
				)
	}
}

export default ScheduledVisit
