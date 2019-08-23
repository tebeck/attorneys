import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import backbutton from '../../_assets/img/btnback.png'


export default class AppearancesComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
    	pCourtHouse: props.location.state.data.courtHouse,
    	pDay: props.location.state.data.hearingDate,
    	pAppId: props.location.state.data._id
      };

      console.log(props.location.state)

     let findCourt ={
     	court: props.location.state.data.courtHouse,
     	day: props.location.state.data.hearingDate
     }
     appearanceService.getAppearanceByCourt(findCourt)
       .then(data => this.setState({data: data.data}))
	

       console.log(props.location.state.data)

	}



	handleClick = (x) =>{
	 this.setState({
	  goToDetail: true,
	  appearanceData: x,
	  recordView: false,
	  appearancesClick: true
	 })
    }

 render() {


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

  const { data } = this.state

  	

   if(data){


   return (
	<div className="container main-body">
	 <Link style={{color: "black"}} to={{ pathname: '/home',state: { key: "agenda"} }}>
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Same day Appearances</h3>
    </Link><br />

    <p>There are {data.length} appearances for the same day at the same court</p><br />

	{data.map(x =>
	<div key={x._id}>
	 {x.attorneyId !== this.state.userId && this.state.pAppId !== x._id ?

    	<div  className="appearanceBox">
          <div className="appearanceHeaderBox flex-space-between">  
            <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
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