import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import {Timeline, TimelineEvent} from 'react-event-timeline';

export default class AgendaComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: []
      };
	
	  appearanceService.getAppearances()
	    .then((result) => this.setState({
	  	  data: result.data
	  	})) 	
	}



    render() {
    
	const {data} = this.state
        return(

	<div>
	  <Timeline lineColor="#1873F3">
	  <button className="btn btn-outline-dark btn-sm float-right">View all</button>
	   {data.map(x =>
	       <TimelineEvent 
	       		key={x._id}
	       		createdAt={x.createdAt}
	       		iconColor="#1873F3" bubbleStyle={{backgroundColor: '#1873F3', width: "10px", height:"10px",left:"11px"}} 
	       		title="" >
	       		<div className="appearanceHeaderBox">
		 	     <div className="flex-space-between">
		 	       <div className="moment">
		 	       	<Moment format="ll">{x.hearingDate}</Moment><span> - {x.time}</span>
		 	       </div>
		 	       <p className="areaOfLaw">{x.areaOfLaw}</p>
		 	     </div> 
		 	    </div> 
		 	    <p style={{paddingTop: "10px", fontWeight: "700", lineSpacing:"14pt", fontSize: "13pt"}}>Trafic Trial</p>
		 	    <p style={{fontSize: "11px", color: "#000000",fontFamily: "Montserrat"}}>{x.courtHouse}</p>

	       </TimelineEvent>
	    )}
	  </Timeline>
	 </div>


        )
    }
}
