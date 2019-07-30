import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import  { Tabs, Tab } from 'react-bootstrap';
import Appearances from './appearances/AppearancesComponent'
import Agenda from './appearances/AgendaComponent'
import Requests from './appearances/RequestsComponent'
import {userServices} from '../_services/user.service'
import {stripeService} from '../_services/stripe.service'
import logo from '../_assets/img/landing/logo.png'
// import userIcon from '../_assets/img/profile.png'
import bellIcon from '../_assets/img/notifications.png'
import greyFaceImg from '../_assets/img/grey-user.png'
import queryString from 'query-string'

export default class HomeComponent extends Component {

  constructor(props, context) {
    super(props, context);
    
  const values = queryString.parse(this.props.location.search)
  console.log(values.code) // "top"
    
  var stripeBody = {
     code: values.code
  }

    stripeService.getStripeInfo(stripeBody)
      .then(console.log("ok"))



    if(props.location.state){
      var keytab = props.location.state.key
    }else { keytab = "agenda"}
    
    this.state = {
      key: keytab,
      isAttorney: Cookies.getJSON('esquired').isAttorney,
      isSeeker: Cookies.getJSON('esquired').isSeeker,
      onHold: Cookies.getJSON('esquired').onHold,
      user: Cookies.getJSON('esquired').user,
      email: Cookies.getJSON('esquired').email
    }

    console.log(props.location.state)

    userServices.getProfile()
      .then(res => {
        if(res.data){
         this.setState({
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

  const {isAttorney, isSeeker, onHold} = this.state

  return (
     <div className="container">
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
          </Link>
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