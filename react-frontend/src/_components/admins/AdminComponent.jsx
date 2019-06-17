import React, { Component } from 'react';
import {adminServices} from '../../_services';
import {userServices} from '../../_services'

export default class AdminComponent extends Component {
    
 constructor(props) {
   super(props);
 
   this.state = {
       email: ""
   };
 }

 handleSubmit = (e) =>{
   e.preventDefault();
   let email = {email: this.state.email}
   adminServices.enableSeeker(email)
    .then( data => {
        console.log(data)
        if(data.status == 200){
            let maildata = {email: data.res.email, subject: "Account Approved",text:"Your account of attorney of appearance has been approved!"}
            userServices.sendmail(maildata)
            alert("Attorney of Appearance enabled!")
        }
    } )
 }

 handleChange = ({target}) =>{
   this.setState({
      [target.name]: target.value
   })
 }

 render() {
    return (
        <div className="container main-body">
         <form onSubmit={this.handleSubmit}>
           <input className="form-control" name="email" type="text" placeholder="email" value={this.state.email} onChange={this.handleChange} ></input>
           <input className="btn btn-block" type="submit" value="Send"></input>
         </form>
        </div>
    );
  }
}
