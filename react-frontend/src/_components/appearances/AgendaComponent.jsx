import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import calendarImg from '../../_assets/img/appearance/appearance_calendar.png'

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
	console.log(data)
	if(data && data.length > 0) {
    return(
	<div>
	<br/><br/>
	  <div>
	  	<span>Past Appearances</span>
	  	<button className="btn btn-outline-dark btn-sm float-right button-upcoming">UPCOMING</button>
	  </div><br />

	   {data.map(x =>
	   	<div key={x._id}>
	   	<div><img width="20px" style={{marginBottom: "6px", marginRight: "6px"}} src={calendarImg} /> <Moment className="timeformat" format="LLL">{x.createdAt}</Moment></div><br/>
    	<div className="appearanceBox">
	      <div className="appearanceHeaderBox flex-space-between">  
	        <Moment className="timeformat" format="LLL">{x.createdAt}</Moment>
	        <div><span class="areaoflaw">{x.areaOfLaw} </span><img src={checkImg} width="18px" alt="esquired" /></div>
	      </div> 
	      <div className="flex-space-between paddingUpDown">
	      <div>
	      <p className="titlebox">Trafic Trial</p>
    	  <div className="divmailing">
	    	<img alt="Esquired" width="20px" src={pingImg}></img>
	    	<p className="mailing">Hall of Justice - 2610 Riverside Drive, Susanville CA</p>
    	  </div>
    	  </div>
	      <div className="agenda-rate-button">
	       <button onClick={this.handleClick} className="apply-button">Rate Attorney</button>
	      </div>
	      </div>
	    </div>
	       </div>
	    )}
	 </div>
        )

	} else {
		return (

			<p>No data found</p>
			)
	}

    }
}
