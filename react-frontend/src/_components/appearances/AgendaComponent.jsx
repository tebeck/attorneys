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
          setTab: ""
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

    completedAppearance = (x) => {

      let body = {
       appId: x._id,
       userId: this.state.userId,
       email: this.state.email
      }
         
      appearanceService.completed(body)
       .then(data => {
           if(data.status === 200){
               console.log("completed")
               this.setState({
               	key: "agenda"
               })
               window.location.reload()
           }
       })

     }


  finishAppearance = (x) =>{

  }
  acceptAppearing = (x) =>{
    
  }


 render() {





  const {data} = this.state
   if(data && data.length > 0) {
    return(
    
    <div>
    <br/><br/>
      <div>
          <span>Past Appearances</span>
          <button className="btn btn-outline-dark btn-sm float-right button-upcoming">UPCOMING</button>
      </div><br />

      

       {data.map(x =>

      <div key={x._id}>
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
           { x.subscription.seekerId != this.state.userId  && x.subscription.status === "finished" ?
             <div>
              <button onClick={this.completedAppearance.bind(this, x)} className="btn btn-outline-primary btn-rate-attorney ">Mark as completed</button>
              <button onClick={this.handleClick} className="btn btn-outline-primary btn-rate-attorney ">Rate Attorney</button> 
             </div> :
             x.subscription.seekerId != this.state.userId && x.subscription.status === "pending" ?
             <button onClick={this.acceptAppearing.bind(this, x)} className="btn btn-outline-primary btn-rate-attorney ">Accept Appearing Attorney</button> :
             
             x.subscription.seekerId == this.state.userId && x.subscription.status === "accepted" ?
             <div>
              <button onClick={this.finishAppearance.bind(this, x)} className="btn btn-outline-primary btn-rate-attorney ">Veredict</button>
              <button onClick={this.unsubscribeAppearance.bind(this, x)} className="btn btn-outline-primary btn-rate-attorney ">Unsubscribe</button> 
             </div>: <button onClick={this.unsubscribeAppearance.bind(this, x)} className="btn btn-outline-primary btn-rate-attorney ">Unsubscribe</button> 
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
