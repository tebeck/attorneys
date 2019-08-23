import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import  { Tabs, Tab } from 'react-bootstrap';
import Appearances from './appearances/AppearancesComponent'
import Agenda from './appearances/AgendaComponent'
import Requests from './appearances/RequestsComponent'
import {userServices, stripeService} from './../_services';

import logo from '../_assets/img/landing/logo.png'

import bellIcon from '../_assets/img/notifications.png'
import greyFaceImg from '../_assets/img/grey-user.png'
import queryString from 'query-string'
import Dialog from 'react-bootstrap-dialog'
import esquired from '../_assets/img/landing/logo.png'


Dialog.setOptions({
  defaultOkLabel: 'OK',
  defaultCancelLabel: 'Cancel',
  primaryClassName: 'btn-primary',
  defaultButtonClassName: 'btn-secondary btn-secondary-style'
})

export default class HomeComponent extends Component {

  constructor(props, context) {
    super(props, context);
    


  const values = queryString.parse(this.props.location.search)
    
  var stripeBody = {
     code: values.code
  }


//http://localhost:3000/home?code=ac_FfkiYwGAtpnQbrjd94RsG0APZhR5R4cS 
    if(stripeBody.code){
      stripeService.getStripeInfo(stripeBody)
      .then(data => { if(data.status === 200){
        this.dialog.show({
          title: <img alt="esquired" className="dialog-img" src={esquired} />,
          body: data.message,
          bsSize: 'small',
          onHide: (dialog) => { 
            dialog.hide()
            window.location.assign('/profile')
          } 

        })
      }
      })
       //.then( window.location.assign('/profile') )
    }
    

    if(props.location.state){
      var keytab = props.location.state.key
    }else { keytab = "agenda"}
    
    this.state = {
      key: keytab,
      isAttorney: Cookies.getJSON('esquired').isAttorney,
      isSeeker: Cookies.getJSON('esquired').isSeeker,
      onHold: Cookies.getJSON('esquired').onHold,
      user: Cookies.getJSON('esquired').user,
      email: Cookies.getJSON('esquired').email,
      isFlushed: false
    }


    userServices.getProfile()
      .then(res => {
        if(res.data){
         this.setState({
          notifications: res.data.notifications,
          imgUrl: res.data.profilePicture
         })
        } else {
          Cookies.remove('esquired');
          window.location.assign('/home');
        }
      })
    


  }


  handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.assign('/home');

  }

  render(){

    var sum = 0;
    
    if (this.state.notifications){
      this.state.notifications.map(x=>
        x.read ? sum
          : sum = sum  + 1 )
    }

  const {isAttorney, isSeeker, onHold} = this.state

  return (
     <div className="container">
     <Dialog ref={(el) => { this.dialog = el }} />
        <div className="navbar header-comp">
          <Link className="home-popup-links" to="/profile">
            { this.state.imgUrl ? 
                <img alt="userIcon" className="userIcon" width="24px" src={this.state.imgUrl}/> :
                <img alt="userIcon" className="userIcon" width="24px" src={greyFaceImg} />
            }
          </Link>

          <div className="logo">
            <a href="/"><img src={logo} alt="esquired" /></a>
          </div>    
          
          
          <Link to="/notifications">
            <img width="20px" src={bellIcon} alt="esquired" />
          </Link><p className="red-color">{sum}</p>

        </div>
        <hr/>
          <Tabs id="controlled-tab-example" className="tabs-control" activeKey={this.state.key ? this.state.key : "agenda"} onSelect={key => this.setState({ key })} >
                <Tab eventKey="agenda" title="Agenda">
                  <Agenda />
                </Tab>
              { isAttorney ? 
                <Tab eventKey="myrequests" title="My Requests">
                  <Requests />
                </Tab> : null
              }
              { isSeeker && !onHold ? 
                <Tab eventKey="myappearances" title="Appearances">
                   <Appearances />
                </Tab> : null
              }
          </Tabs>
          
    </div>
   );
   }
}


export { HomeComponent };