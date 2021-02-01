import React, { Component } from 'react';
import {adminServices} from '../../_services';
import groupBy from 'json-groupby';

export default class AdminReportsComponent extends Component {
    
 constructor(props) {
   super(props);

   this.state = {
     email: ""
   }

   if(props.history.location.state && props.history.location.state.isRedirect){
     	console.log("true")
   } else {
	 props.history.goBack()
   }
 }


 componentWillMount(){
	adminServices.getDoneAppearances()
		.then(data =>
			this.setState({
				data: data.data,
			})
		)
 }



 render() {

	const { data } = this.state


	if(data){

	let pending = this.state.data.filter( function (app) {
      return app.status === 'pending'
    });
    
	let applied = this.state.data.filter( function (app) {
      return app.status === 'applied'
    });
    
	let accepted = this.state.data.filter( function (app) {
      return app.status === 'accepted'
    });
	
	let done = this.state.data.filter( function (app) {
      return app.status === 'completed' || app.status === 'finished' || app.status === 'rated'
    });
				
	let total = this.state.data.map(function(app){
		return app
	});





	let data = [];
	data = groupBy(this.state.data, ['attorneyId'])
	

	var result = Object.keys(data).map(function(key) {
	  return ( [key, data[key]]);
	});


	
	var records = result.map(x=> x[0])
	var status = result.map(x=> x[1])

	return(
		<div>
		   <h1>Reports</h1>
			<div>Pending:  {pending.length}</div>
			<div>Applied:  {applied.length}</div>
			<div>Accepted: {accepted.length}</div>
			<div>Done: {done.length}</div>
			{result.map((x,i)=> 
				<div key={i}>

				   <div>Record: {x[0]} </div>
				   <div>Percentage: { x[1].length }</div>
				</div>  
			)}	

			<div>Total appearances: {total.length}</div>


		</div>
		
	)
	} else {
		return ("aa")
	}

}
}