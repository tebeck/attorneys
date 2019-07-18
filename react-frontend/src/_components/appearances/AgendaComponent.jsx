import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import Moment from 'react-moment';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import checkImg from '../../_assets/img/appearance/appearance_check.png'
import calendarImg from '../../_assets/img/appearance/appearance_calendar.png'
import Cookie from 'js-cookie'
import { Redirect} from 'react-router-dom';

export default class AgendaComponent extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
          data: [],
          userId: Cookie.getJSON('esquired').userId,
          email: Cookie.getJSON('esquired').email,
          setTab: "",
          veredict: false
      };
    
      appearanceService.getAgendaTab()
        .then((result) => this.setState({
            data: result.data,
            appId: result.data._id
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
               console.log("finished")
               this.setState({
               	key: "agenda"
               })
               window.location.reload()
           }
       })

     }


  completeAppearance = (x) =>{
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


  getInfoAppearing = (x) => {

  }


 render() {


   if(this.state.veredict){
     return <Redirect to={{ pathname: '/veredict',state: this.state.veredictState }} />
   }


  const {data} = this.state
   if(data && data.length > 0) {
    return(
    
    <div >
    <br/><br/>
      <div >
          <span>Past Appearances</span>
          <button className="btn btn-outline-dark btn-sm float-right button-upcoming">UPCOMING</button>
      </div><br />

      

       {data.map(x =>

      <div key={x._id} >
           <div><img width="20px" style={{marginBottom: "6px", marginRight: "6px"}} src={calendarImg} /> <Moment className="timeformat" format="LLL">{x.createdAt}</Moment></div><br/>
          <div className="appearanceBox">
          <div className="appearanceHeaderBox flex-space-between">  
            <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
            <div><span className="areaoflaw">{x.areaOfLaw} </span><img src={checkImg} width="18px" alt="esquired" /></div>
          </div> 
          <div className="flex-space-between paddingUpDown">
          <div>
          <p className="titlebox">{x.caseName}</p>
          <div className="divmailing">
            <img alt="Esquired" width="20px" src={pingImg}></img>
            <p className="mailing">{x.courtHouse}</p>
          </div>
          </div>
          <div className="agenda-rate-button">
           { x.subscription.seekerId != this.state.userId  && x.status === "completed" ?
             <div>
              <button onClick={this.finishAppearance.bind(this, x)} className="btn apply-button ">Mark as finished</button>
              <button onClick={this.handleClick} className="btn apply-button ">Rate Attorney</button> 
             </div> :
             x.subscription.seekerId != this.state.userId && x.status === "applied" ?
             <div>
              <button onClick={this.acceptAppearing.bind(this, x)} className="btn apply-button ">Accept</button>
              <button onClick={this.rejectAppearing.bind(this, x)} className="btn apply-button ">Reject</button>
              <button onClick={this.getInfoAppearing.bind(this, x)} className="btn apply-button ">Appearing info</button>
             </div> :
             
             x.subscription.seekerId == this.state.userId && x.status === "accepted" ?
             <div>
              <button onClick={this.completeAppearance.bind(this, x)} className="btn apply-button">Veredict</button>
              <button onClick={this.unsubscribeAppearance.bind(this, x)} className="btn apply-button">Unsubscribe</button> 
             </div>:
              x.subscription.seekerId != this.state.userId  && x.finished === "finished" ?
              null :
              null 
           }
          </div>
          </div>
          </div> 
      </div> 
        )}
    </div>)
    
    }else {
        return ( <div> <br/><br/> <p>You don't have future appearances to attend</p><br/><br/> </div> )
    }
  }
 
}
