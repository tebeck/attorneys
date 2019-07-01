import React, { Component } from 'react';
import {adminServices} from '../../_services';
import {userServices} from '../../_services'

export default class AdminComponent extends Component {
    
 constructor(props) {
   super(props);

   this.state = {
     email: ""
   }

 }


 componentWillMount(){
      adminServices.getUsers()
     .then(data => 
         this.setState({
           users: data.data
         })
       )
 }

 handleSubmitApprove = (e) =>{
   e.preventDefault();

   console.log(e.target)
   let element = e.target

   let email = {email: e.target.value}
   adminServices.enableSeeker(email)
    .then( data => {
        console.log(data)
        if(data.status === 200){
            let maildata = {email: data.res.email, subject: "Role Approved",text:"Your role of appearing attorney has been approved!"}
            userServices.sendmail(maildata)
            alert("Appearing attorney enabled!")
            window.location.reload();
        }
    } )
   

 }

 handleSubmitReject = (e) =>{
   e.preventDefault();

   console.log(e.target)
   let element = e.target

   let email = {email: e.target.value}
   adminServices.rejectSeeker(email)
    .then( data => {
        console.log(data)
        if(data.status === 200){
            let maildata = {email: data.res.email, subject: "Role Rejected",text:"Your role of appearing attorney was rejected!"}
            userServices.sendmail(maildata)
            alert("Appearing attorney rejected!")
            window.location.reload();
        }
    } )
   

 }


 handleChange = ({target}) =>{
   this.setState({
      [target.name]: target.value
   })
 }



 render() {


if(this.state && this.state.users){
  console.log(this.state.users)
    return (
<div className=" tablecont">
      

  
  <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">Email</th>
        <th scope="col">State Bar</th>
        <th scope="col">Role</th>
        <th scope="col">Status</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
 
{
        this.state.users.map(x =>
    <tbody key={x._id} >
      <tr>
        <td>{x.email}</td>
        <td>{x.stateBar}</td>
        <td>
          {x.isAttorney && x.isSeeker ? "Both" : null}
          {x.isAttorney && !x.isSeeker ? "AOR" : null}
          {!x.isAttorney && x.isSeeker ? "AOA" : null}
        </td>
        <td>{x.onHold ? "holded" : "ok"}</td>
        
        <td>{x.onHold ? <button value={x.email} onClick={this.handleSubmitApprove} className="btn btn-info">Approve</button> : null}</td>
        <td>{x.onHold ? <button value={x.email} onClick={this.handleSubmitReject} className="btn btn-danger">Reject</button> : null}</td>
      </tr>
    </tbody>
      )} 

  </table>

 
      



  </div>
    
    )}

else {
  return(

    <div>
    No users found
    </div>
    )
}

  }
}
