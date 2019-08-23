import React, { Component } from 'react';
import {adminServices} from '../../_services';
import Header from '../HeaderComponent';
import { Redirect } from 'react-router-dom';

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
    
    .then( response  => {
      console.log(response)
        if(response){
          console.log(response.status)
          if(response.status === 200){
          this.setState({validUser: true})

        } else {
            console.log("aca")
          this.setState({ 
            errlogin: response.message,
            validUser: false 
          })
        }
        }
  })



 }




 handleChange = ({target}) =>{
   this.setState({
      [target.name]: target.value
   })
 }

 render() {

   const {errlogin} = this.state

   if(this.state.validUser){
     return <Redirect to={{ pathname: '/adminpanel' ,state: { validUser: this.state.validUser } }} />
   }


    return (
        <div className="container main-body">
        <Header guest="1"  />

         <div className={errlogin ? 'display' : 'hide'}>
           <div className="alert alert-danger" role="alert" style={{fontSize: "11px"}}>{this.state.errlogin}</div>
         </div>
         <form onSubmit={this.handleSubmit}>
           <input className="form-control" name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} style={{marginTop: "30px"}} ></input>
           <input className="form-control" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} ></input>
           <input className="btn btn-primary btn-block" type="submit" value="Login"></input>
         </form>

         <div>

         </div>
        </div>
    );
  }
}
