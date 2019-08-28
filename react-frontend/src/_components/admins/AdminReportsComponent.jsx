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



export default class AdminReportsComponent extends Component {
    
 constructor(props) {
   super(props);

   	this.state = {
 	}
 }

 componentWillMount(){
	
	adminServices.getAppearances()
		.then(data =>
			this.setState({
				data: data.data
			})
		)

 }



 render() {
	
	const { data } = this.state

	if(data){

	let pending = this.state.data.filter( function (post) {
      return post.status === 'pending'
    });
    
	let applied = this.state.data.filter( function (post) {
      return post.status === 'applied'
    });
    
	let accepted = this.state.data.filter( function (post) {
      return post.status === 'accepted'
    });

	return(
		<div>
		   <h1>Reports</h1>
			<div>Pending:  {pending.length}</div>
			<div>Applied:  {applied.length}</div>
			<div>Accepted: {accepted.length}</div>
			<div>Quantity accepted/created: {accepted.length/pending.length}</div>
		</div>
		
	)
	} else {
		return ("aa")
	}

}
}