import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';


const styles = {
	ListStyleNone: {
	  listStyleType: 'none'
	}
  }

export default class ProductsComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: [],
      	activePage: 1
      };
	
	  appearanceService.products(this.state.activePage)
	    .then((result) => this.setState({
	  	  data: result
	  	})) 

 	this.handleClickPage = this.handleClickPage.bind(this);
     	
	}

	handleClickPage(event){
	  this.setState({ activePage: Number(event.target.id) })
	   appearanceService.products(Number(event.target.id))
	    .then((result) => this.setState({
	  	  data: result
	  	})) 
	}



	handleClick = id => e => {
		 window.location.assign('/updateproduct/' + id)
	}


  render() {
   const {data,activePage } = this.state

let items = [];
for (let number = 1; number <= 10; number++) {
  items.push(
    <Pagination.Item key={number} id={number} active={number === activePage}>
      {number}
    </Pagination.Item>,
  );
}

	if(data){
	 return (
	  <div>
	   <h1>ListProducts</h1><br/>
		<ul style={styles.ListStyleNone}> 
		 {data.map(x =>
		 	<li key={x._id}>{x.title} 
		  		<button data-id={x._id} onClick={this.handleClick(x._id)}>Edit</button>
		 	</li>
		  )}	
		   </ul>
		   
  <div>
    <Pagination onClick={this.handleClickPage}>{items}</Pagination>
  </div>

			 <Link className="btn btn-primary" to="/">Back</Link>
			</div>
		)
	} else{
		return (<div><p>No products found</p>
				<br />
			<Link className="btn btn-primary" to="/">Back</Link></div>)
	}
	}
}
