import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import {userServices} from '../../_services/user.service'
import Moment from 'react-moment';
import Modal from 'react-awesome-modal';
import Cookie from 'js-cookie'


export default class AppearancesComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: [],
	  	email: Cookie.get('esquired').email
      };
	
	  appearanceService.getAppearances()
	    .then((result) => this.setState({
	  	  data: result.data
	  	})) 	
	}

	handleClick = () =>{
		const data = ["tebeckford@gmail.com", "aaa", "232323"]
		userServices.sendmail(data)
		this.openModal()
	}

	openModal() {
     this.setState({
        visible : true
     });
    }

    closeModal() {
     this.setState({
       visible : false
     });
    }

 render() {

  const { data } = this.state

   if(data){
	return (
	 <div className="container main-body">
	  <Modal visible={this.state.visible} width="370" height="445" effect="fadeInDown" onClickAway={() => this.closeModal()}>
	   <div style={{padding: "30px",textAlign: "center"}}>
	    <i className="fas fa-4x green-background fa-envelope-open-text"></i><br/><br/>
	    <h5>Well done!</h5>
	     <p>We will send you an email with confirmation and additional info.</p>
	   
		
	     <p>We will send you an email with confirmation and additional info.</p>
	     <button className="btn btn-block btn-primary link-button">View appearances</button>
	    
	      <br /><br />
	    
	    <button onClick={() => this.closeModal()} className="btn btn-block btn-outline-primary">Maybe later</button>
	  </div>
	  </Modal>
  		
  	<div style={{display: "flex",justifyContent: "space-between", marginTop:"10px" }}>
	  <p>There are 5 appearances</p>
	  	 <div>
	  	 <i style={{marginRight: "10px"}} className="fas green-background fa-1x fa-sort"></i>
	  	 <i className="fas green-background fa-1x fa-filter"></i>
	  	 </div>
	</div>
	<br/>
	
	{data.map(x =>

    	<div key={x._id} className="appearanceBox">
	      <div className="appearanceHeaderBox">  
	        <Moment style={{fontWeight: "500", lineSpacing:"14pt",margin: "5px"}} format="LLL">{x.createdAt}</Moment>
	      </div> 
	      <p style={{paddingTop: "10px", fontWeight: "700", lineSpacing:"14pt", fontSize: "13pt"}}>Trafic Trial</p>
    	  <p style={{fontSize: "11px", color: "#000000",fontFamily: "Montserrat"}}>Hall of Justice - 2610 Riverside Drive, Susanville CA</p>
	      <p style={{margin: "0px"}}>$75</p>	
	      <div style={{textAlign: "right"}}>
	      	<button onClick={this.handleClick} style={{margin: "0px 10px 10px 10px",padding:"5px 35px 5px 35px"}} className="btn btn-primary link-button">Apply</button>
	      </div>
	    </div>

	)}	
	</div>

	 )} else { return ( <div><p>No appearances found</p></div> ) }
  }
}