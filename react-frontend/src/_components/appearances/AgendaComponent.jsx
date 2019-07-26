import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import calendarImg from '../../_assets/img/appearance/appearance_calendar.png'
import Cookie from 'js-cookie'
import { Redirect} from 'react-router-dom';
import StarRatings from 'react-star-ratings';

var oneDayMore = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)

export default class AgendaComponent extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          data: [],
          userId: Cookie.getJSON('esquired').userId,
          email: Cookie.getJSON('esquired').email,
          setTab: "",
          veredict: false,
          toggleButtons: true,
          goToDetail: false
      };
    
      appearanceService.getAgendaTab()
        .then((result) => this.setState({
            data: result.data,
            appId: result.data._id,
            originalData: result.data
          }))     
    }


    unsubscribeAppearance = (x) => {
      let body = {
       appId: x._id,
       userId: this.state.userId,
       email: this.state.email
      }
         
      appearanceService.unsubscribe(body)
       .then(data => {
         if(data.status === 200){
             
          // userServices.sendmail()
           alert("unsubscription successfull")
           this.setState({
             key: "agenda"
           })
           window.location.reload()
          }
       })

     }

    finishAppearance = (x) => {

      let body = {
       appId: x._id,
       userId: this.state.userId,
       email: this.state.email
      }
         
      appearanceService.finishAppearance(body)
       .then(data => {
           if(data.status === 200){
               alert("finished")
               this.setState({
               	key: "agenda"
               })
               window.location.reload()
           }
       })

     }


  completeAppearance = (x) =>{
    console.log("veredict")
    this.setState({
      veredict: true,
      veredictState: x
    })
  }

  
  acceptAppearing = (x) =>{
    
    let body = {
      appId: x._id,
      seekerId: x.subscription.seekerId
    }
    
    appearanceService.acceptAppearing(body)
      .then(alert("appearance accepted"))
      .then(window.location.reload())

  }

  rejectAppearing = (x) =>{
    
    let body = {
      appId: x._id,
      seekerId: x.subscription.seekerId
    } 
    appearanceService.rejectAppearing(body)
      .then(alert("appearance rejected"))
      .then(window.location.reload())

  }


  attorneyInfo = (x) => {

  }

  viewDetails = (x) => {
    
  }


  handleClickPastApp = (event) =>{
   var updatedList = this.state.originalData;
   updatedList = updatedList.filter(function(item) {
    return item.status === "completed" || item.status === "finished"
   })

   this.setState({ data: updatedList, toggleButtons: false});
  }

  handleClickUpcomming = (event) => {
   var updatedList = this.state.originalData;
   updatedList = updatedList.filter(function(item) {
    return item.status === "applied" || item.status === "accepted"
   })

   this.setState({ toggleButtons: true, data: updatedList});
  }

  handleClickViewAll = (event) => {
    this.setState({
      data: this.state.originalData
    })
  }


  getInfoAppearing = (x) => {
    
  }


  rateAttorney = (x) =>{

    this.setState({
      rateComponent: true,
      rateComponentState: x
    })

  }

  handleClickAppearance = (x,e) =>{
    if(e.target.tagName === "DIV"){
      this.setState({
        goToDetail: true,
        appearanceData: x,
        recordView: true
      })
    }
  }

 render() {


  if(this.state.goToDetail){
    return (
     <Redirect to={{ pathname: "/appearancedetail", state: { appearanceData: this.state.appearanceData,isAttorney: true,recordView: this.state.recordView} }}/>)
  }

   if(this.state.rateComponent){
     return <Redirect to={{ pathname: '/rate',state: this.state.rateComponentState }} />
   }


   if(this.state.veredict){
     return <Redirect to={{ pathname: '/veredict',state: this.state.veredictState }} />
   }


  const {data} = this.state
   if(data && data.length > 0) {
    return(
    
    <div >
    <br/>
    <br/>
      <div >
      

        {this.state.toggleButtons ? 
          <button onClick={this.handleClickPastApp} className="btn btn-outline-dark btn-sm float-left button-upcoming">Past Appearances</button>
          :
          <button onClick={this.handleClickUpcomming} className="btn btn-outline-dark btn-sm float-left button-upcoming">Upcomming</button>
        }
          <button onClick={this.handleClickViewAll} className="btn btn-outline-dark btn-sm float-right button-upcoming">View All</button>

      </div>
      <br />
      <br />
      <br />

      

       {data.map(x =>
    
      <div key={x._id} onClick={this.handleClickAppearance.bind(this,x)} >
        {x.subscription.seekerId === this.state.userId && x.subscription.attorneyRate ? "You don't have future appearances to attend" :
          x.attorneyId === this.state.userId && x.subscription.seekerRate ? "You don't have future appearances to attend" :
          <div>
          <div><img width="20px" style={{marginBottom: "6px", marginRight: "6px"}} src={calendarImg} /> <Moment className="timeformat" format="LLL">{x.createdAt}</Moment></div><br/>
          <div className="appearanceBox" >
          <div className="appearanceHeaderBox flex-space-between">  
            <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
            <div><span className="areaoflaw">{x.areaOfLaw} </span><img src={checkImg} width="18px" alt="esquired" /></div>
          </div> 
          <div className="flex-space-between paddingUpDown" style={{minHeight: "150px", marginBottom: "20px"}}>
          <div>
          <p className="titlebox"  >{x.caseName}</p>
          <div className="divmailing">
            <img alt="Esquired" width="20px" src={pingImg}></img>
            <p className="mailing">{x.courtHouse}</p>
          </div>
          </div>
          <div className="agenda-rate-button">
           { 
              
             x.subscription.seekerId === this.state.userId && new Date().getTime() < new Date(x.subscription.date).getTime()+ (1 * 24 * 60 * 60 * 1000) && x.status === "accepted" ?
             <div><button onClick={this.completeAppearance.bind(this, x)} className="btn apply-button">Veredict</button>
              <button onClick={this.unsubscribeAppearance.bind(this, x)} className="btn apply-button">Unsubscribe</button>  </div>
              :

             x.subscription.seekerId === this.state.userId && new Date().getTime() < new Date(x.subscription.date).getTime()+ (1 * 24 * 60 * 60 * 1000) && x.status === "applied" ?
             <button onClick={this.unsubscribeAppearance.bind(this, x)} className="btn apply-button">Unsubscribe</button> :
             x.attorneyId === this.state.userId  && x.status === "completed" ?
             <div><button onClick={this.finishAppearance.bind(this, x)} className="btn apply-button ">Mark as finished</button> </div> 
             :
             x.subscription.seekerId !== this.state.userId && x.status === "applied" ?
             <div>
              <button onClick={this.acceptAppearing.bind(this, x)} className="btn apply-button ">Accept</button>
              <button onClick={this.rejectAppearing.bind(this, x)} className="btn apply-button ">Reject</button>
              <button onClick={this.getInfoAppearing.bind(this, x)} className="btn apply-button ">Appearing info</button>
             </div> :
             
             x.subscription.seekerId === this.state.userId && x.status === "accepted" ?
             <div>
              <button onClick={this.completeAppearance.bind(this, x)} className="btn apply-button">Veredict</button>
             </div>:
              
              x.attorneyId === this.state.userId && x.status === "finished"  && x.subscription.seekerRate === undefined ?
              <button onClick={this.rateAttorney.bind(this, x)} className="btn apply-button ">Rate Appearing Attorney</button>  :
              
              x.subscription.seekerId === this.state.userId && x.status === "finished"  && x.subscription.attorneyRate === undefined ?
              <button onClick={this.rateAttorney.bind(this, x)} className="btn apply-button ">Rate Record Attorney</button>  :

              x.attorneyId !== this.state.userId  && x.status === "completed" ? 
               <div>
                <button onClick={this.attorneyInfo.bind(this, x)} className="btn apply-button ">Attorney Info</button>
                <button onClick={this.viewDetails.bind(this, x)} className="btn apply-button ">View Details</button>
              </div>: null
           }
          </div>
          </div>
          </div>
          </div>}
      </div> 
        )}
    </div>)
    
    }else {
        return ( <div> <br/><br/>
        {this.state.toggleButtons ? 
          <button onClick={this.handleClickPastApp} className="btn btn-outline-dark btn-sm float-left button-upcoming">Past Appearances</button>
          :
          <button onClick={this.handleClickUpcomming} className="btn btn-outline-dark btn-sm float-left button-upcoming">Upcomming</button>
        }
        <button onClick={this.handleClickViewAll} className="btn btn-outline-dark btn-sm float-right button-upcoming">View All</button>
          <br/><br/> <p>You don't have future appearances to attend</p><br/><br/> </div> )
    }
  }
 
}
