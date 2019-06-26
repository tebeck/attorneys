import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import {userServices} from '../../_services/user.service'
import Moment from 'react-moment';
import Modal from 'react-awesome-modal';
import Cookie from 'js-cookie'
import listFilterImg from '../../_assets/img/listing_filter.png'
import listSortImg from '../../_assets/img/listing_sort.png'
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'


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
	    <i className="fas fa-4x fa-envelope-open-text"></i><br/><br/>
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
	  	 <div className="flex-space-between">
		 	<img style={{marginRight: "10px"}} width="18px" height="18px" alt="esquired" src={listSortImg} /><br/><br/>
	  	 	<img alt="esquired" src={listFilterImg} width="18px" height="18px" /><br/><br/>
	  	 </div>
	</div>
	<br/>
	
	{data.map(x =>

    	<div key={x._id} className="appearanceBox">
	      <div className="appearanceHeaderBox">  
	        <Moment className="timeformat" format="LLL">{x.createdAt}</Moment>
	      </div> 
	      <p className="titlebox">Trafic Trial</p>
    	  <div className="divmailing">
	    	<img width="20px" src={pingImg}></img>
	    	<p className="mailing">Hall of Justice - 2610 Riverside Drive, Susanville CA</p>
    	  </div>
    	  <div className="divprice">
	       <img width="17px" src={priceImg}></img>
	       <p className="price"> $75</p>	
	      </div>
	      <div className="right">
	       <button onClick={this.handleClick} className="apply-button">Apply</button>
	      </div>
	    </div>

	)}	
	</div>

	 )} else { return ( <div><p>No appearances found</p></div> ) }
  }
}