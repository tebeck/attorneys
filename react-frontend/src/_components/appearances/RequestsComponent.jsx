import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import {userServices} from '../../_services/user.service'
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import Dialog from 'react-bootstrap-dialog'
import esquired from '../../_assets/img/landing/logo.png'

Dialog.setOptions({
  defaultOkLabel: 'OK',
  defaultCancelLabel: 'Cancel',
  primaryClassName: 'btn-primary',
  defaultButtonClassName: 'btn-secondary btn-secondary-style'
})

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
	  userServices.getProfile()
	  	.then(result => {
	  	    if(!result.data.stripe_customer_id) {
				this.dialog.show({
				  title: <img alt="esquired" className="dialog-img" src={esquired} />,
				  body: 'Please, connect with Stripe and insert your credit card.',
				  actions: [ Dialog.OKAction(() => { window.location.assign('/profile') })],
				  bsSize: 'small',
				  onHide: (dialog) => { 
				    dialog.hide() 
				    window.location.assign('/profile')
				  }
				})
		    } else {
		    	this.setState({ redirect: true })     
		    }	  		
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
		  recordView: true,
		  myRequestsClick: true
		})
	}

  attorneyInfo = (x) =>{
  	
  }


  handleClickAppearance = (x,e) =>{
    if(e.target.tagName === "DIV"){
      this.setState({
        goToDetail: true,
        appearanceData: x,
        recordView: true,
        myRequestsClick: true
      })
    }
  }

 render() {
  
  const {data} = this.state
   
  if(this.state.goToDetail && this.state.appearanceData){
  	return (
  	 <Redirect to={{
	   pathname: "/appearancedetail",
	   state: { appearanceData: this.state.appearanceData,
	    isAttorney: true,
	    recordView: this.state.recordView,
	    myRequestsClick: this.state.myRequestsClick
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
	 <div>
	 	
	 <br/>
	  {requests.map((x,i) =>
	   <div key={x._id}> 

	   	{i < 1 ? <span>Active requests<br/><br/></span>:null}
	     <div>
	        {x.status === "pending" ? <p className="text-center pending-assignment alert alert-warning">Pending assignment</p> :null}
    	    
    	    {x.status === "accepted" ? 
		    <div key={x._id} onClick={this.handleClick.bind(this, x)} style={{minHeight: "250px"}} className="appearanceBox juryDeliverating">
          <div style={{marginTop: "30px"}} className="appearanceHeaderBox flex-space-between juryDeliveratingHeader">  
            <div><Moment className="timeformat" format="LL">{x.hearingDate}</Moment> - <span className="timeformat"> {x.time}</span></div>
            <div><span className="areaoflaw">{x.areaOfLaw} </span><img src={checkImg} width="18px" alt="esquired" /></div>
          </div> 
	          <div style={{minHeight: "150px", marginBottom: "20px"}}>
	           <div style={{opacity: 0.4}}>
		          {x.caseName.length > 19 ?
		          <p className="titlebox"  >{x.caseName.substr(0,40)+'...'}</p> :
		          <p className="titlebox"  >{x.caseName}</p>
		          }
    	        <div className="divmailing">
	        	   <img alt="Esquired" width="20px" src={pingImg}></img>
		          {x.courtHouse.length > 19 ?  
		            <p className="mailing">{x.courtHouse.substr(0,40)+'...'}</p> :
		            <p className="mailing">{x.courtHouse}</p>
		          }
    	       </div>
    	       </div>
    	      <div className="divprice" style={{opacity: 0.4}}>
	             <img alt="Esquired" width="18px" src={priceImg}></img>
	             <p className="price">$75</p>	
	          </div>
	          <p className="juryText"><span style={{fontWeight:"bold"}}>The jury is deliberating</span><br /> We will notify you when there is a verdict.</p>

	          </div>
	          
	        </div>


	      	:
		    <div key={x._id} className="appearanceBox">
	          <div className="appearanceHeaderBox">  
	              <div><Moment className="timeformat" format="LL">{x.hearingDate}</Moment> - <span className="timeformat"> {x.time}</span></div>
	          </div> 
	          <div style={{minHeight: "150px", marginBottom: "20px"}}>
		          {x.caseName.length > 19 ?
		          <p className="titlebox"  >{x.caseName.substr(0,40)+'...'}</p> :
		          <p className="titlebox"  >{x.caseName}</p>
		          }
    	        <div className="divmailing">
	        	   <img alt="Esquired" width="20px" src={pingImg}></img>
		          {x.courtHouse.length > 19 ?  
		            <p className="mailing">{x.courtHouse.substr(0,40)+'...'}</p> :
		            <p className="mailing">{x.courtHouse}</p>
		          }
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
	   <div key={x._id} onClick={this.handleClickAppearance.bind(this,x)}> 
	   	{i < 1 ? <span>Finished requests<br/><br/></span>:null}
	     <div>
	        {

	        x.status === "pending" ? <p className="text-center pending-assignment alert alert-warning">Pending assignment</p> :
	    	x.attorneyId === this.state.userId && !x.subscription.attorneyRate ? <p className="text-center pending-assignment alert alert-warning">Waiting Appearing Rating</p> :
	    	x.subscription.seekerId === this.state.userId && !x.subscription.seekerRate ? <p className="text-center pending-assignment alert alert-warning">Waiting Record Rating</p> :null}




    	    {x.status === "accepted" ? 
            <div key={x._id} style={{minHeight: "250px"}} className="appearanceBox juryDeliverating">
              <div>
               <p className="juryText"><span style={{fontWeight:"bold"}}>The jury is deliverating</span><br /> We will notify when the Verdict<br /> information has been loaded.</p>
    	      </div>
	        </div>
	      	:
		    <div key={x._id} className="appearanceBox">
	          <div className="appearanceHeaderBox">  
	              <div><Moment className="timeformat" format="LL">{x.hearingDate}</Moment> - <span className="timeformat"> {x.time}</span></div>
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
	  	     	 null}
	  	      </div>
	          </div>
	        </div>}
		 </div>
  	   </div>)}
	  {this.renderRedirect()}<button onClick={this.setRedirect} className="btn btn-block btn-primary link-button">Create New Request</button><br /><br />
     </div>
  )}
    else { return ( <div><br/><br/><p>You don't have requests created</p><br/><br/>
    	{this.renderRedirect()}<button onClick={this.setRedirect} className="btn btn-block btn-primary link-button">Create New Request</button><br /><br /><Dialog ref={(el) => { this.dialog = el }} /></div> ) }
}

}
