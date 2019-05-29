import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Moment from 'react-moment';



const styles = {
	ListStyleNone: {
	  listStyleType: 'none'
	}
  }

export default class AppearancesComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: []
      };
	
	  appearanceService.getAppearances()
	    .then((result) => this.setState({
	  	  data: result.data
	  	})) 	
	}

 render() {

  const { data } = this.state

   if(data){
	return (
	 <div>
	  <span>There are 5 appearances</span><span><a><i className="fas fa-filter"></i></a><a><i className="fas fa-sort"></i></a></span><br/>
	<div className="container">
	{data.map(x =>
	  <div key={x._id}>
		 <div className="" style={{width: "100%", border: "1px solid lightgrey", borderRadius: "10px"}}>
		 	<div style={{height: "30%", backgroundColor: "lightgrey",borderRadius: "10px 10px 0px 0px",padding: "10px", fontSize: "13px"}}>
		 	  <span><Moment format="LLL">{x.createdAt}</Moment></span>
		 	</div>
		 	 <p>Trafic Trial</p>
		 	 <p style={{fontSize: "12px", color: "grey"}}>Hall of Justice - 2610 Riverside Drive</p>
		 	 <p style={{margin: "0px"}}>$75</p>
		 	 <div style={{textAlign: "right",margin: "0px 10px 10px 10px"}}>
		 	 	<button style={{padding: "5px 50px 5px 50px"}} className="btn btn-primary">Accept</button>
		 	</div>
		 </div>
		 <br />
	  </div>
	)}	
	</div>
  	
  	 
	</div> )} else { return ( <div><p>No appearances found</p></div> ) }
  }
}
