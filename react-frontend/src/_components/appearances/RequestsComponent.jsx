import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';

export default class RequestsComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: [],
	  	redirect: false
      };
	
	  appearanceService.getAppearances()
	    .then((result) => this.setState({
	  	  data: result.data
	  	})) 	
	}

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/createappearance' />
    }
  }


 render() {
  
  const {data} = this.state
	return (
	 <div>
	  <span>Active Requests</span><i className="fas fa-chevron-down"></i><br/>
		{data.map(x =>
		<div key={x._id} className="container">
		  <div className="appearanceBox">
		      <div className="appearanceHeaderBox">  
		        <Moment className="boxYear" format="ll">{x.hearingDate}</Moment><span> - {x.time}</span>
		      </div> 
		      <p className="boxTitle">{x.caseName}</p>
	    	  <p className="boxDescription">Hall of Justice - 2610 Riverside Drive, Susanville CA</p>
		      <p>$75</p>	
		      <div className="boxButton">
		      	<button onClick={this.handleClick} className="btn btn-primary link-button">Accept</button>
		      </div>
		    </div>
		    
		</div>
  		)}
  		{this.renderRedirect()}<button onClick={this.setRedirect} className="btn btn-block btn-primary link-button">Create New Request</button>
	</div>
  )}
    
}
