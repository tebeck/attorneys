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

   if(data){
	return (
	 <div>
	  <span>Active Requests</span><i className="fas fa-chevron-down"></i><br/>
	<div className="container">
	  <div className="appearanceBox">
	      <div className="appearanceHeaderBox">  
	        <Moment style={{fontWeight: "500", lineSpacing:"14pt",margin: "5px"}} format="LLL"></Moment>
	      </div> 
	      <p style={{paddingTop: "10px", fontWeight: "700", lineSpacing:"14pt", fontSize: "13pt"}}>Trafic Trial</p>
    	  <p style={{fontSize: "11px", color: "#000000",fontFamily: "Montserrat"}}>Hall of Justice - 2610 Riverside Drive, Susanville CA</p>
	      <p style={{margin: "0px"}}>$75</p>	
	      <div style={{textAlign: "right"}}>
	      	<button onClick={this.handleClick} style={{margin: "0px 10px 10px 10px",padding:"5px 35px 5px 35px"}} className="btn btn-primary">Accept</button>
	      </div>
	    </div>
	    {this.renderRedirect()}
	  <button onClick={this.setRedirect} className="btn btn-block btn-primary">Create New Request</button>
	</div>
  	
  	 
	</div> )} else { return ( <div><p>No appearances found</p></div> ) }
  }
    
}
