import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../_assets/img/btnback.png'
import editPhotoImg from '../_assets/img/btn_editphoto.png'
import uploadImg from '../_assets/img/upload_picture.png'

import {userServices} from '../_services/user.service'

export default class InfoComponent extends Component {
  
  constructor(props) {
    super(props);  
    
    this.state = {
      data: props.location.state,
      response: [],
      firstName:"",
      lastName:"",
      email:"",
      mobilePhone:"",
      profilePicture:""
    }

    let body = {
      uid: this.state.data.attorneyId
    }

    userServices.getUserProfile(body)
      .then(res => {
        this.setState({
          response: res,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          mobilePhone: res.mobilePhone,
          profilePicture: res.profilePicture
        })
      }) 
  this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {
   
    const {response} = this.state 
   return (

    <div className="container main-body">
      <Link style={{color: "black"}} to="/home">
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Attorney Info</h3>
      </Link>      
       <hr />
      {response ?
        <div>

                <div className="text-center">
                   <label className="uploadLabel" htmlFor="avatar">
                     { this.state.profilePicture ? 
                       <div>
                         <img  alt="avatar" width="200px" src={this.state.profilePicture} />
                       </div>
                       : 
                       <div>
                         <img src={uploadImg} alt="profileImg" /><br/><br/>Upload Profile Picture<br />
                       </div> }
                   </label>
                   
                </div>
          <div className="form-group">
            <label htmlFor="firstName" className="profileInputsTitle">First Name</label>
            <input className="form-control bigInput" disabled type="text" onChange={this.handleChange} value={this.state.firstName} />
          </div>
          <div className="form-group">
            <label htmlFor="firstName" className="profileInputsTitle">Last Name</label>
            <input className="form-control bigInput" disabled type="text" onChange={this.handleChange} value={this.state.lastName} />
          </div>
          <div className="form-group">
            <label htmlFor="firstName" className="profileInputsTitle">Email</label>
            <input className="form-control bigInput" disabled type="text" onChange={this.handleChange} value={this.state.email} />
          </div>
          <div className="form-group">
            <label htmlFor="firstName" className="profileInputsTitle">Mobile Phone</label>
            <input className="form-control bigInput" disabled type="text" onChange={this.handleChange} value={this.state.mobilePhone} />
          </div>

        </div>  
      : null }
        <hr />
    </div>  
  	)}
  }

