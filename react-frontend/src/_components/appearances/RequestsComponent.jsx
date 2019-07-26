import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import StarRatings from 'react-star-ratings';

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
  
  if(data && data.length > 0){



  	  var finished = this.state.data.filter(function (finishapp) {
  	    return finishapp.status === "finished";
	  });
  	  var requests = this.state.data.filter(function (requests) {
  	    return requests.status !== "finished";
  	  });


  	  console.log(requests)


	return (
	 <div><br/>
	  {requests.map((x,i) =>
	   <div key={x._id}> 
	   	{i < 1 ? <span>Active requests</span>:null}
	     <div>
	        {x.status == "pending" ? <p className="text-center pending-assignment alert alert-warning">Pending assignment</p> :null}
    	    {x.status === "accepted" ? 
            <div key={x._id} style={{minHeight: "250px"}} className="appearanceBox juryDeliverating">
              <div>
               <p className="juryText"><span style={{fontWeight:"bold"}}>The jury is deliverating</span><br /> We will notify when the veredict<br /> information has been loaded.</p>
    	      </div>
	        </div>
	      	:
		    <div key={x._id} className="appearanceBox">
	          <div className="appearanceHeaderBox">  
	              <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
	          </div> 
	          <div style={{minHeight: "150px", marginBottom: "20px"}}>
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
	            { x.status === "applied" ?
	             <button onClick={this.attorneyInfo.bind(this, x)} className="apply-button outlinebtn">Attorney info</button> : null }
	  	        { x.status === "pending" || x.status === "applied" ? 
	  	         <div><button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">Edit</button></div> :   
	  	     	   <div><button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">View</button></div>}
	  	      </div>
	          </div>
	        </div>}
		 </div>
  	   </div>)}<br/>
	  {finished.map((x,i) =>
	   <div key={x._id}> 
	   	{i < 1 ? <span>Finished requests</span>:null}
	     <div>
	        {

	        x.status == "pending" ? <p className="text-center pending-assignment alert alert-warning">Pending assignment</p> :
	    	x.subscription.attorneyRate === undefined && x.status == "finished" ? <p className="text-center pending-assignment alert alert-warning">Waiting Record Rating</p> :
	    	x.subscription.seekerRate === undefined && x.status == "finished" ? <p className="text-center pending-assignment alert alert-warning">Waiting Appearing Rating</p> :null}




    	    {x.status === "accepted" ? 
            <div key={x._id} style={{minHeight: "250px"}} className="appearanceBox juryDeliverating">
              <div>
               <p className="juryText"><span style={{fontWeight:"bold"}}>The jury is deliverating</span><br /> We will notify when the veredict<br /> information has been loaded.</p>
    	      </div>
	        </div>
	      	:
		    <div key={x._id} className="appearanceBox">
	          <div className="appearanceHeaderBox">  
	              <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
	          </div> 
	          <div style={{minHeight: "150px", marginBottom: "20px"}}>
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
	            { x.status === "applied" ?
	             <button onClick={this.attorneyInfo.bind(this, x)} className="apply-button outlinebtn">Attorney info</button> : null }
	  	        { x.status === "pending" || x.status === "applied" ? 
	  	         <div><button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">Edit</button></div> :   
	  	     	  x.status !== "finished" ?
	  	     	 <div><button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">View</button></div>
	  	     	 :
	  	     	  x.status === "finished" && x.subscription.seekerId === this.state.userId && x.subscription.seekerRate ? 
                  <div style={{marginTop: "10px"}}>
                   <StarRatings
                     rating={x.subscription.seekerRate}
                     starRatedColor="#f7bd2a"
                     starHoverColor="#f7bd2a"
                     starEmptyColor="white"
                     name='rating'
                     starDimension="30px"
                     starSpacing="2px"
                   /></div>
                 :
                  x.status === "finished" && x.subscription.attorneyRate ? 
                  <div style={{marginTop: "10px"}}>
                   <StarRatings
                     rating={x.subscription.attorneyRate}
                     starRatedColor="#f7bd2a"
                     starHoverColor="#f7bd2a"
                     starEmptyColor="white"
                     name='rating'
                     starDimension="30px"
                     starSpacing="2px"
                   /></div>: null
	  	     	}
	  	      </div>
	          </div>
	        </div>}
		 </div>
  	   </div>)}
     </div>
  )}
    else { return ( <div><br/><br/><p>You don't have requests created</p><br/><br/>
    	{this.renderRedirect()}<button onClick={this.setRedirect} className="btn btn-block btn-primary link-button">Create New Request</button></div> ) }
}

}
