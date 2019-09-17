import React from "react"

function DrawerInfo(prop){
  return (
    <div class="ui list" style={{padding: '20px'}} >
            <div class="item" >
              <div class="header"><h3>Unit Information: 
              <h3>{prop.binName}</h3></h3>
              </div>
                 <div class="header">Location Description</div>
                 (description)
                 <div class="header">Last Visited</div>
                 (Days ago)
                 <div class="header">Current Status</div>
                 (10% used)
                 <p>{prop.binStatus}</p>
                 <div class="header">Equipment Info</div>
                 (Battery OK)
                 (Status OK)
                 <div class="header">Serial Info</div>
                 (1234ABCD)
            </div>
            <div class="item">
              <div class="header"><h4>Maintenance</h4></div>
                <div class="header"><a href="">Schedule Visit</a></div>
                <div class="header"><a href=""> Current Scheduled Reports</a></div>
                <div class="header"><a href="">All Unit Status and Configuration</a></div>
              </div>
            </div>
  )
}
export default DrawerInfo