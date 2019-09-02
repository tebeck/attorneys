import React, { Component } from 'react';
import {adminServices} from '../../_services';
import {userServices} from '../../_services'
import {Link} from 'react-router-dom'
// var DataTable = require('react-data-components').DataTable;
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import logo from '../../_assets/img/landing/logo.png'
import Popup from "reactjs-popup";
import userIcon from '../../_assets/img/landing/landing_login.png'

export default class AdminComponent extends Component {
    
 constructor(props) {
   super(props);

   this.state = {
     email: ""
   }

   if(props.history.location.state && props.history.location.state.validUser){
     console.log("true")
   } else {
     window.location.assign('/admin')
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

   let email = {email: e.target.value}
   adminServices.enableSeeker(email)
    .then( data => {
        console.log(data)
        if(data.status === 200){
            let maildata = {email: data.res.email, subject: "Role Approved",text:"Your role has been approved!"}
            userServices.sendmail(maildata)
            alert("User enabled!")
            window.location.reload();
        }
    } )
   

 }

 handleSubmitReject = (e) =>{
   e.preventDefault();

   let email = {email: e.target.value}
   adminServices.rejectSeeker(email)
    .then( data => {

        if(data.status === 200){
            let maildata = {email: data.res.email, subject: "Role Rejected",text:"Your role was rejected!"}
            userServices.sendmail(maildata)
            alert("User rejected!")
            window.location.reload();
        }
    } )
   

 }


 handleLogout = (e) =>{
   e.preventDefault()

   window.location.assign("/admin")
 }

 handleChange = ({target}) =>{
   this.setState({
      [target.name]: target.value
   })
 }



 render() {
var data = this.state.users;

const columns = [
  {
    id: 'creationdate',
    Header: 'Creation Date',
    accessor: row => row.createdAt.substring(0, 10)
  },
  {
    id: 'name',
    Header: 'Name',
    accessor: row => row.firstName,
  },
  {
    id: 'lname',
    Header: 'Last Name',
    accessor: row => row.lastName,
  },
  {
    Header: 'Email',
    accessor: 'email',
    minWidth: 150
  },
  {
    Header: 'State Bar',
    accessor: 'stateBar',
  },
  {
    id: 'role',
    Header: "Role",
    accessor: x => x.isAttorney && x.isSeeker ? "Both" : (x.isAttorney && !x.isSeeker) ? "Attorney Of Record" : "Appearing Attorney", 
  },
  {
    id: 'status',
    Header: 'Status',
    accessor: x => x.status === "rejected" ? "Rejected" : (x.onHold) ? "Pending" : "OK",
  },
  {
    id: 'buttonaccept',
    filterable: false,
    accessor: x => x.onHold ? 
      <div>
       <button style={{marginRight: "4px"}} value={x.email} onClick={this.handleSubmitApprove} className="btn btn-info">Approve</button>
       <button value={x.email} onClick={this.handleSubmitReject} className="btn btn-danger">Reject</button>
      </div> : null,
  },
]






if(this.state && this.state.users){

    return (
<div>
      
  <div className="navbar header-comp flex-space-between">
          <div className="logoadm"><a href="/"><img src={logo} alt="esquired" /></a></div>
          <div className="align-center"><p>Users</p></div>
          <Link className="align-center" to={{pathname: '/adminreports', state:{isRedirect: true} }}><p>Reports</p></Link>
          <div className="align-center">
            <Popup contentStyle={{ width:"100px",padding: "20px", border: "none" }} className="popup-desktop" trigger={<img alt="userIcon" width="20px" src={userIcon} />} position="left top">
              <div>
                <p className="logout-link" onClick={this.handleLogout}>Logout</p>
              </div>
            </Popup><span></span>
          </div>
    </div>

<ReactTable
  data={data}
  columns={columns}
  defaultPageSize={50}
  sorted={[{ id: 'createdAt', desc: false }]}
  filterable
/>





  </div>
    
    )}

else {
  return(

    <div>
    Loading...
    </div>
    )
}

  }
}
