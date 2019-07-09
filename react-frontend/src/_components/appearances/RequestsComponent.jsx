import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'

export default class RequestsComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: [],
	  	redirect: false
      };
	
	  appearanceService.getRequests()
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

	handleClick = (x) =>{
		this.setState({
		  goToDetail: true,
		  appearanceData: x
		})
	}

 render() {
  
  const {data} = this.state
   
  if(this.state.goToDetail && this.state.appearanceData){
  	return (
  	 <Redirect to={{
	   pathname: "/appearancedetail",
	   state: { appearanceData: this.state.appearanceData,
	    isAttorney: true 
	   }
	 }}/>)
  }

  if(data){
	return (
	 <div><br/><br/>
	  <span>Active Requests</span>
	  <button className="btn btn-outline-dark btn-sm float-right">VIEW ALL</button><br/><br/>
		{data.map(x =>
		<div key={x._id}>
	      
	      {x.status == "published" ? 
	      <p className="text-center pending-assignment alert alert-warning">Pending assignment</p> :
	       x.status === "accepted" ? 
	       <p className="text-center accepted-assigment alert alert-success">Accepted</p> : null } 
	      
    	<div key={x._id} className="appearanceBox">
	      <div className="appearanceHeaderBox">  
	        <Moment className="timeformat" format="LLL">{x.createdAt}</Moment>
	      </div> 
	      <p className="titlebox">{x.caseName}</p>
    	  <div className="divmailing">
	    	<img alt="Esquired" width="20px" src={pingImg}></img>
	    	<p className="mailing">{x.courtHouse}</p>
    	  </div>
    	  <div className="divprice">
	       <img alt="Esquired" width="18px" src={priceImg}></img>
	       <p className="price">$75</p>	
	      </div>
	      <div className="right">
	       <button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">Edit</button>
	      </div>
	    </div>
		    <br />
		</div>
  		)}
  		{this.renderRedirect()}<button onClick={this.setRedirect} className="btn btn-block btn-primary link-button">Create New Request</button>
	<br/><br/></div>
  )}
    else { return ( <div><p>No requests found</p></div> ) }
}

}
