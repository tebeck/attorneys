import React, { Component } from 'react';
import {adminServices} from '../../_services';
import Cookies from 'js-cookie'

export default class AdminComponent extends Component {
    
 constructor(props) {
   super(props);

   this.state = {
       email: "",
       password: "",
       validUser: false
   };
 }

 handleSubmit = (e) =>{
   e.preventDefault();
   let data = {email: this.state.email, password: this.state.password}
   adminServices.login(data)
    .then( data => {
        if(data.status === 200){

         this.setState({
           validUser: true
         })
         Cookies.set('esqadm', {token: "faketoken"}, { path: '' })   
   } else {
     this.setState({
       errLogin: "Invald username/password"
     })
     }
  })



 }




 handleChange = ({target}) =>{
   this.setState({
      [target.name]: target.value
   })
 }

 render() {

   if(this.state.validUser){
    window.location.assign('/adminpanel')
   }
    

    return (
        <div className="container main-body">
         <form onSubmit={this.handleSubmit}>
           <input className="form-control" name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} ></input>
           <input className="form-control" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} ></input>
           <input className="btn btn-primary btn-block" type="submit" value="Login"></input>
         </form>

         <div>

         </div>
        </div>
    );
  }
}
