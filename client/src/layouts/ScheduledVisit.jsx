import React from 'react';
import binData from "./../binData"




class ScheduledVisit extends React.Component {
	 constructor() {
	    super()
    
    	this.state = {
    		binInfo: binData
    	
    	}

    	this.handleChange = this.handleChange.bind(this)
    	this.handleRefresh = this.handleRefresh.bind(this)
  	}

 
	  handleChange(name){
	  	this.setState(prevState => {
	            const updatedBinData = prevState.binInfo.map(bin => {
	                if (bin.name === name) {
	                	if(bin.setSchedule == true) {
	                		bin.setSchedule = "remove"
	                		console.log(bin.setSchedule)
	                	} else if(bin.setSchedule == "remove") {
	                		bin.setSchedule = true
	                		console.log("dont remove")
	                	}

	                    
	                    
	                    console.log("bin " + bin.name + " is " + bin.setSchedule)
	                   
	                }
	                return bin
	            })

	            return {
	                binInfo: updatedBinData
	            }
	        })
	  }

	  handleRefresh(){
	  	console.log("refresh")

	  	this.setState(prevState => {
	            const updatedBinData = prevState.binInfo.map(bin => {
	            	if(bin.setSchedule == "remove") {
	                		bin.setSchedule = false
	                		console.log(bin.setSchedule)
	                }                     
	                    
	                    // console.log("bin " + bin.name + " is " + bin.setSchedule)
	                   
	                
	                return bin
	            })

	            return {
	                binInfo: updatedBinData
	            }
	        })



	  }

	render() {
		   const binRequest = binData.map(bin=>{
		   		if(bin.setSchedule || bin.setSchedule == "remove") {
		   			return (
						<tr>
								<td>{bin.name}</td>
								<td>{bin.locationDescription}</td>
								<td>{bin.status}%</td>
								<td class="collapsing">
									<div class="ui fitted checkbox">
           								<input 	id={bin.name} type="checkbox" 
           										// checked={checked}
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
      						<th>Remove</th>
    					</tr>
  					</thead>
	  					<tbody>
							{binRequest}
						</tbody>
  					<tfoot class="full-width">
	    				<tr>
      						<th></th>
      						<th colspan="3">
	        					<div >
		        					<button class="ui right floated small primary labeled icon button" onClick={this.handleRefresh}><i class="user icon"></i> Refresh Report</button>
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
