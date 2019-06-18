import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';


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

	<div><br/>	
	  <div>
	  	<span>Past Appearances</span>
	  	<button className="btn btn-outline-dark btn-sm float-right">UPCOMING</button>
	  </div><br />

	   {data.map(x =>
	   	<div key={x._id}>
	   	<div className="headerDate"><Moment format="LLLL">{x.createdAt}</Moment></div>
	       <div className="appearanceBox">
	       		<div className="appearanceHeaderBox">
		 	     <div className="flex-space-between">
		 	       <div className="appearanceMoment"><Moment format="ll">{x.hearingDate}</Moment><span> - {x.time}</span></div>
		 	       <p className="appearanceArea">{x.areaOfLaw}</p>
		 	     </div> 
		 	    </div> 
		 	    <div className="appearanceFooter">
		 	     <div className="flex-space-between">
		 	      <p className="appearanceTitle">Trafic Trial</p>
		 	      <button className="btn btn-outline-primary">Rate Attorney</button>
		 	     </div>
		 	     <p className="appearanceCourt">{x.courtHouse}</p>
		 	    </div>
	       </div><br />
	       </div>
	    )}
	 </div>


        )
    }
}
