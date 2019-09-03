import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import backbutton from '../../_assets/img/btnback.png'
import Dialog from 'react-bootstrap-dialog'
import esquired from '../../_assets/img/landing/logo.png'

Dialog.setOptions({
  defaultOkLabel: 'OK',
  defaultCancelLabel: 'Cancel',
  primaryClassName: 'btn-primary',
  defaultButtonClassName: 'btn-secondary btn-secondary-style'
})

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
		
	handleApplyToAll = (x) =>{
	
	


				this.dialog.show({
					title: <img alt="esquired" className="dialog-img" src={esquired} />,
					body: 'Are you sure you want to apply to all?',
					actions: [ Dialog.OKAction(() => { 
						var result = Object.values(x).map(x => x._id)
						let	body = {
							appId: result
						}
						appearanceService.subscribeToAll(body)
						.then(data=> {
									if(data.status === 200){
										window.location.assign('/home')
							}
						})					
	
					}),
								 Dialog.CancelAction(() => {  })
								 ],
					bsSize: 'small',
					onHide: (dialog) => { 
						dialog.hide()  
					}
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
		<Dialog ref={(el) => { this.dialog = el }} />
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
	<button onClick={this.handleApplyToAll.bind(this,data)} className="btn btn-primary apply-button">Apply to all</button>	
	</div>
	 )} else { return ( <div><p>No appearances found</p></div> ) }
  }
}