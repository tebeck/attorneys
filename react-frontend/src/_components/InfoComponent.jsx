import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../_assets/img/btnback.png'

import {userServices} from '../_services/user.service'

export default class InfoComponent extends Component {
  
  constructor(props) {
    super(props);  
    
    this.state = {
      data: props.location.state,
      response: []
    }

    let body = {
      uid: this.state.data.attorneyId
    }

    userServices.getUserProfile(body)
      .then(res => {
        this.setState({
          response: res.data
        })
      }) 
  

  }

  render() {
   
    console.log(this.state)
    const {response} = this.state 

   return (
    <div className="container main-body">
      <p>{response.email}</p>
      <p>{response.firstName}</p>
      <p>{response.lastName}</p>
      <p>{response.mobilePhone}</p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  	);
  }
}
