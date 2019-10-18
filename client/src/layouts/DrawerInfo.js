import React from "react"
import binData from "./../binData"

function DrawerInfo(prop){
  return (
    <div className="ui list" style={{padding: '20px'}} >
            <div className="item" >
              <div className="header">Unit Information:<h3>{prop.binName}</h3></div>
              <div className="header">Location Description</div>
              <p>{prop.binLocation}</p>
              <div className="header">Last Visited</div>
                (Days ago)
              <div className="header">Current Status</div>
              <p>{prop.binStatus}% Full</p>
              <div className="header">Equipment Info</div>
              (Battery OK)
              (Status OK)
              <div className="header">Serial Info</div>
              {prop.binSerial}
            </div>
            <div className="item">
              <div className="header"><h4>Maintenance</h4></div>
                <ScheduleVisit binname={prop.binName} />
                <div className="header"><a href=""> Current Scheduled Reports</a></div>
                <div className="header"><a href="">All Unit Status and Configuration</a></div>
              </div>
            </div>
  )
}

class ScheduleVisit extends React.Component {
  constructor() {
    super()
    

    this.state = {
    	binInfo: binData,
      binVisit: "binData.setSchedule"
    	
    }

    this.handleClick = this.handleClick.bind(this)
  }

 
  handleClick(name){
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

  visit(name) {
   const word = this.state.binInfo.map(bin=>{
    if(bin.name == name) {
        if(bin.setSchedule) {
          return  (
            <span className="ui red button">Unschedule</span>
            )

        } else {
          return (
                <span className="ui blue button">Schedule Visit?</span>
                )
        }
    }
   })
   return word
   
  }

  render() {
  	// const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item}
  	// const binInfo = this.state.binInfo.map(bin=> )
  
  	
    return(

      <div>
        <button className="buttonSchedule" onClick={()=>{this.handleClick(this.props.binname)}}>{this.visit(this.props.binname)}</button>
        <div></div>
      </div>
      )
  }
}

export default DrawerInfo