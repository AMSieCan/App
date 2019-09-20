import React from "react"



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
  }

  render() {
    return(

      <div>
        <button>Schedule Visit </button>
        <div>{this.prop.binname}</div>
      </div>
      )
  }
}






export default DrawerInfo