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
	
	  appearanceService.getRequestsTab()
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
		  appearanceData: x,
		  recordView: true
		})
	}

  attorneyInfo = (x) =>{
  	
  }

 render() {
  
  const {data} = this.state
   
  if(this.state.goToDetail && this.state.appearanceData){
  	return (
  	 <Redirect to={{
	   pathname: "/appearancedetail",
	   state: { appearanceData: this.state.appearanceData,
	    isAttorney: true,
	    recordView: this.state.recordView
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
	      {x.status !== "finished" ? 
	     <div>
	      {x.status == "pending" ? 
	      <p className="text-center pending-assignment alert alert-warning">Pending assignment</p> :
	       x.status === "accepted" ? 
	       <p className="text-center accepted-assigment alert alert-success">Accepted</p> :
	       x.status === "applied" ? 
	       <p className="text-center info-assigment alert alert-info">Applied</p>: null } 
	      
    	  <div key={x._id} className="appearanceBox">
	        <div className="appearanceHeaderBox">  
	            <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
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
	          {
	          	x.status === "applied" ? <button onClick={this.attorneyInfo.bind(this, x)} className="apply-button outlinebtn">Attorney info</button> : null
	  	      }
	  	      { x.status !== "completed" || x.status !== "finished" ?
	            <div><button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">Edit</button><br/></div>
	        :   <div><br/><br/></div>}
	        </div>
	      </div><br />

		</div>: null}
  		</div>)}

		<h4>Finished:</h4>
	    
		{data.map(x =>
    	  x.status === "finished" ?
    	  <div key={x._id}>
    	    <div className="appearanceBox">
	         <div className="appearanceHeaderBox">  
	            <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
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
	          <div><button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">Edit</button><br/></div>
	     	</div>	          
	        </div>
	      </div>:null	
	     )}

  		{this.renderRedirect()}<button onClick={this.setRedirect} className="btn btn-block btn-primary link-button">Create New Request</button>
	<br/><br/></div>
  )}
    else { return ( <div><p>No requests found</p></div> ) }
}

}
