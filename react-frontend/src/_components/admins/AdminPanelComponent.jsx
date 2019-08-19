import React, { Component } from 'react';
import {adminServices} from '../../_services';
import {userServices} from '../../_services'
// var DataTable = require('react-data-components').DataTable;
import ReactTable from 'react-table'
import 'react-table/react-table.css'



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
  console.log(this.state.users)
    return (
<div >
      
  

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
