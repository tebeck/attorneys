import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service'
import Popup from "reactjs-popup";
// import {userServices} from '../../_services/user.service'
import Moment from 'react-moment';
// import Modal from 'react-awesome-modal';
import Cookie from 'js-cookie'
import listFilterImg from '../../_assets/img/listing_filter.png'
import listSortImg from '../../_assets/img/listing_sort.png'
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'

import checkImg from '../../_assets/img/appearance/appearance_check.png'


export default class AppearancesComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: [],
	  	email: Cookie.getJSON('esquired').email,
	  	userId: Cookie.getJSON('esquired').userId,
	  	goToDetail: false,
	  	value:''
    };
	
	appearanceService.getAppearancesTab()
	 .then((result) => this.setState({
	    data: result.data,
	    originalData: result.data,
	  	number: result.data.length
	 }))
    }

	handleClick = (x) =>{
	 this.setState({
	  goToDetail: true,
	  appearanceData: x,
	  recordView: false,
	  appearancesClick: true
	 })
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


  handleChangeFilter = event => {
	
    var updatedList = this.state.originalData;
	updatedList = updatedList.filter(function(item) {
	 var courtHouseSearch = item.courtHouse.toLowerCase().search(event.target.value.toLowerCase()) !== -1
	 var areaOfLawSearch = item.areaOfLaw.toLowerCase().search(event.target.value.toLowerCase()) !== -1
	
	 return courtHouseSearch ? courtHouseSearch : areaOfLawSearch 

	});
      

    this.setState({data: updatedList});
  }


  handleSortClick = () => {
    this.state.data.sort((a, b) => a - b).reverse()
    this.setState({ data: this.state.data })
  }



 render() {

  const { data } = this.state

  if(this.state.goToDetail && this.state.appearanceData){
  	return (
  	 <Redirect to={{
	   pathname: "/appearancedetail",
	   state: { 
	   	appearanceData: this.state.appearanceData,
	    isAttorney: false,
	    recordView: this.state.recordView,
	    appearancesClick: this.state.appearancesClick
	   }
	 }}/>)
  }

   if(data){


   let b = 0;
   	for (var i = data.length - 1; i >= 0; i--) {
   		if(this.state.userId !== data[i].attorneyId){
   			b = b +1
   		}
   	}


   return (
	<div className="container main-body">
  	<div style={{display: "flex",justifyContent: "space-between", marginTop:"10px" }}>
	  <p>There are {b} appearances</p>
	  	 <div className="flex-space-between sort-filter">
		 	<img onClick={this.handleSortClick} style={{marginRight: "10px"}} width="18px" height="18px" alt="esquired" src={listSortImg} /><br/><br/>
  	         <Popup className="filter-popup" trigger={<img alt="esquired" src={listFilterImg} width="18px" height="18px" />} position="left top">
		      <div className="filter-list" >
		        <p>Filter by Courthouse or Area of Law</p>
		        <input type="text" className="form-control form-control-lg" style={{fontSize: "15px"}} placeholder="Search" onChange={this.handleChangeFilter} />
		      </div>
             </Popup>
	  	 </div>
	</div>
	<br/>

	
	{data.map(x =>
	<div key={x._id}> 
     {x.attorneyId !== this.state.userId ?	
    	<div  className="appearanceBox" onClick={this.handleClick.bind(this, x)}>
          <div className="appearanceHeaderBox flex-space-between">  
            <div><Moment className="timeformat" format="LL">{x.hearingDate}</Moment> - <span className="timeformat"> {x.time}</span></div>
            <div><span className="areaoflaw">{x.areaOfLaw} </span><img src={checkImg} width="18px" alt="esquired" /></div>
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
	       {
	         x.subscription && x.subscription.seekerId !== this.state.userId ? 
		     <button onClick={this.handleClick.bind(this, x)} className="apply-button">Apply</button> : 
		     <button disabled className=" btn apply-button disabled">Applied</button>	
		   }
          </div>
	    </div>
	    </div>
		 :  null }
    </div>
	)}	
	</div>
	 )} else { return ( <div><p>No appearances found</p></div> ) }
  }
}