import React from "react"
import binData from "./../binData"



function DrawerInfo(prop){
  return (
    <div class="ui list" style={{padding: '20px'}} >
            <div class="item" >
              <div class="header"><h3>Unit Information: 
              <h3>{prop.binName}</h3></h3>
              </div>
                 <div class="header">Location Description</div>
                 <p>{prop.binLocation}</p>
                 <div class="header">Last Visited</div>
                 (Days ago)
                 <div class="header">Current Status</div>
                 <p>{prop.binStatus}% Full</p>
                 <div class="header">Equipment Info</div>
                 (Battery OK)
                 (Status OK)
                 <div class="header">Serial Info</div>
                 (1234ABCD)
            </div>
            <div class="item">
              <div class="header"><h4>Maintenance</h4></div>
                <ScheduleVisit binname={prop.binName} />
                <div class="header"><a href=""> Current Scheduled Reports</a></div>
                <div class="header"><a href="">All Unit Status and Configuration</a></div>
              </div>
            </div>
  )
}

class ScheduleVisit extends React.Component {
  constructor() {
    super()

    this.state = {
    	binInfo: binData,
    	
    }

    this.handleClick = this.handleClick.bind(this)
  }

 
  handleClick(name){
  	this.setState(prevState => {
            const updatedBinData = prevState.binInfo.map(bin => {
                if (bin.name === name) {
                    bin.setSchedule = !bin.setSchedule
                    console.log("set schedule" + bin.setSchedule)
                }
                return bin
            })
            return {
                binInfo: updatedBinData
            }
        })
  	
  	
  }

  render() {
  	// const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item}
  	// const binInfo = this.state.binInfo.map(bin=> )
  	
    return(

      <div>
        <button onClick={()=>{this.handleClick(this.props.binname)}}>s{this.state.setSchedule ? "Scheduled" : "Schedule Service"}</button>
        <div></div>
      </div>
      )
  }
}






export default DrawerInfo