import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {userServices} from '../_services/user.service'

const validate = values => {
  const errors = {}
  if(!values.password) {
    errors.password = 'Insert password'
  }
  if(!values.email) {
    errors.email = 'Insert email'
  }
  if(!values.firstName) {
    errors.firstName = 'Insert firstName'
  }
  if(!values.lastName) {
    errors.lastName = 'Insert lastName'
  }
  if(!values.lawFirm) {
    errors.lawFirm = 'Insert lawFirm'
  }
  if(!values.stateBar) {
    errors.stateBar = 'Insert stateBar'
  }
  if(!values.officePhone) {
    errors.officePhone = 'Insert officePhone'
  }
  if(!values.mobilePhone) {
    errors.mobilePhone = 'Insert mobilePhone'
  }
  if(!values.mailingAddress) {
    errors.mailingAddress = 'Insert mailingAddress'
  }
  if(!values.creditCard) {
    errors.creditCard = 'Insert creditCard'
  }
  if(!values.policy) {
    errors.policy = 'Insert policy'
  }
  if(!values.notification) {
    errors.notification = 'Insert notification'
  }
  if(!values.insurancePolicy) {
    errors.insurancePolicy = 'Insert insurancePolicy'
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
      
      <label htmlFor="firstName">First Name</label>  
        <input className="form-control" name="firstName" onChange={this.handleChange}></input>
        {errors.firstName && <p className="form-text text-danger">{errors.firstName}</p>}        
      
      <label htmlFor="lastName">Last Name</label>  
        <input className="form-control" name="lastName" onChange={this.handleChange}></input>
        {errors.lastName && <p className="form-text text-danger">{errors.lastName}</p>}        
      
      <label htmlFor="lawFirm">Law Firm</label>
        <input className='form-control' name="lawFirm" onChange={this.handleChange}></input>
        {errors.lawFirm && <p className="form-text text-danger">{errors.lawFirm}</p>}
      
      <label htmlFor="stateBar">State Bar</label>
        <input className="form-control" name="stateBar" onChange={this.handleChange}></input>
        {errors.stateBar && <p className="form-text text-danger">{errors.stateBar}</p>}  
      
      <label htmlFor="officePhone">Office Phone</label>
        <input className="form-control" type="text" name="officePhone" onChange={this.handleChange}></input>
        {errors.officePhone && <p className="form-text text-danger">{errors.officePhone}</p>}
      
      <label htmlFor="mobilePhone">Mobile Phone</label>
        <input className="form-control" type="text" name="mobilePhone" onChange={this.handleChange}></input>
        {errors.mobilePhone && <p className="form-text text-danger">{errors.mobilePhone}</p>}
      
      <label htmlFor="mailingAddress">Mailing Address</label>
        <input className="form-control" type="text" name="mailingAddress" onChange={this.handleChange}></input>
        {errors.mailingAddress && <p className="form-text text-danger">{errors.mailingAddress}</p>}

      <label htmlFor="creditCard">Credit Card Number</label>
        <input className="form-control" type="text" name="creditCard" onChange={this.handleChange}></input>
        {errors.creditCard && <p className="form-text text-danger">{errors.creditCard}</p>}  

      <label htmlFor="policy">Policy</label>
        <input className="form-control" type="text" name="policy" onChange={this.handleChange}></input>
        {errors.policy && <p className="form-text text-danger">{errors.policy}</p>}

      <label htmlFor="insurancePolicy">Insurance Policy</label>
        <input className="form-control" type="text" name="insurancePolicy" onChange={this.handleChange}></input>
        {errors.insurancePolicy && <p className="form-text text-danger">{errors.insurancePolicy}</p>}

      <label htmlFor="password">Password</label>
        <input className="form-control" type="password" name="password" onChange={this.handleChange}></input>
        {errors.password && <p className="form-text text-danger">{errors.password}</p>}
      
      <input type="hidden" name="isAttorney" value={isAttorney} />
      <label htmlFor="terms">Accept terms </label>
      <input type="checkbox" name="terms" value="true" />

        <br />
        <input className="btn btn-primary active" type="submit" value="Register"></input><Link className="btn btn-link" to="/login">Login</Link>
      </form>
        <br /><br />
        <p><Link to="/guest">Back</Link></p>

    </div>
    )
  }
}
