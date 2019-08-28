import React from 'react';
import { Link } from 'react-router-dom';

export default class My404Component extends React.Component {
  
  render(){
  
  return (
  
  	<div>
  		<h2>Page not found</h2>
		<center><Link to="/">Return to Home Page</Link></center>
  	</div>
  
  )}

}