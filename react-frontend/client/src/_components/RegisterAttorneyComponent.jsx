import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {userServices} from '../_services/user.service'

const validate = values => {
  const errors = {}
  if(!values.email) {
    errors.email = 'Insert email'
  }
  if(!values.name){
    errors.name = 'Insert name'
  }
  if(!values.contactInfo){
    errors.contactInfo = 'Insert contactInfo'
  }
  if(isNaN(values.phone) || (!values.phone) ){
    errors.phone = 'Insert a valid phone'  
  }
  if(!values.routingNumber){
    errors.routingNumber = 'Insert routingNumber routingNumber'
  }
  if(isNaN(values.accountNumber) || (!values.phone) ){
    errors.accountNumber = 'Insert a valid phone'  
  }
  if(!values.password) {
    errors.password = 'Insert  password'
  } 
  return errors;
}

export default class RegisterForm extends Component {

state = {
  errors: {}
}

constructor(props) {
  super(props)
  this.state = {
    ...this.state,
    error: false,
    isAttorney: true
  }
}


  handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }
  
  handleSubmit = (e) =>{
    e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})
    if(!Object.keys(result).length) {
        // MANDAR EL FORMULARIO
        this.userRegister(noErrors)
    } else {
      this.setState({ errors: result  })
    }
  }


    userRegister = (data) => {
    userServices.register(data).then(res =>{
      console.log(res)
        if(res.state === 409 || res.state === 401){
            this.setState({error: true})
        } else{
          alert("email sent")
          //window.location.assign('/login');
        }
      })
  }

  render(){
    const {errors, error, isAttorney} = this.state

  return(
    <div>
      <form onSubmit={this.handleSubmit}>
       <div className={error ? 'display' : 'hide'}>
        <div className="alert alert-danger" role="alert">
          Email already in use. Try another.
        </div>
        </div>
      <label htmlFor="email">Email</label>
        <input className={error ? 'form-control is-invalid': 'form-control'} name="email" onChange={this.handleChange}></input>
        {errors.email && <p className="form-text text-danger">{errors.email}</p>}
      <label htmlFor="name">Name</label>  
        <input className="form-control" name="name" onChange={this.handleChange}></input>
        {errors.name && <p className="form-text text-danger">{errors.name}</p>}        
      <label htmlFor="contactInfo">Contact Info</label>
        <input className='form-control' name="contactInfo" onChange={this.handleChange}></input>
        {errors.contactInfo && <p className="form-text text-danger">{errors.contactInfo}</p>}
      <label htmlFor="phone">Phone</label>
        <input className="form-control" name="phone" onChange={this.handleChange}></input>
        {errors.phone && <p className="form-text text-danger">{errors.phone}</p>}  
      <label htmlFor="routingNumber">Routing Number</label>
        <input className="form-control" type="text" name="routingNumber" onChange={this.handleChange}></input>
        {errors.routingNumber && <p className="form-text text-danger">{errors.routingNumber}</p>}
      <label htmlFor="accountNumber">Account Number</label>
        <input className="form-control" type="text" name="accountNumber" onChange={this.handleChange}></input>
        {errors.accountNumber && <p className="form-text text-danger">{errors.accountNumber}</p>}
      <label htmlFor="password">Password</label>
        <input className="form-control" type="password" name="password" onChange={this.handleChange}></input>
        {errors.password && <p className="form-text text-danger">{errors.password}</p>}
        <input type="hidden" name="isAttorney" value={isAttorney} />
        <br />
        <input className="btn btn-primary active" type="submit" value="Register"></input><Link className="btn btn-link" to="/login">Login</Link>
      </form>
        <br /><br />
        <p><Link to="/guest">Back</Link></p>

    </div>
    )
  }
}
