import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {userServices} from '../_services/user.service'

const validate = values => {
  const errors = {}
  if(!values.name) {
    errors.name = 'Insert name'
  }
  if(!values.lastname){
    errors.lastname = 'Insert lastname'
  }
  if(!values.email){
    errors.email = 'Insert email'
  }
  if(!values.password) {
    errors.password = 'Insert  password'
  }
  if(!values.confirm){
    errors.confirm = 'Insert password confirm'
  }
  if(isNaN(values.phone) || (!values.phone) ){
    errors.phone = 'Insert a valid phone'  
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
    type: true
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
        if(res.status.status === 409 || res.status.status === 401){
            this.setState({error: true})
        } else{
          alert("email sent")
          window.location.assign('/');
        }
      })
  }

  render(){
    const {errors, error, type} = this.state

  return(
    <div>
      <form onSubmit={this.handleSubmit}>
       <div className={error ? 'display' : 'hide'}>
        <div className="alert alert-danger" role="alert">
          Email already in use. Try another.
        </div>
        </div>
      <label htmlFor="name">Name</label>
        <input className="form-control" name="name" onChange={this.handleChange}></input>
        {errors.name && <p className="form-text text-danger">{errors.name}</p>}
      <label htmlFor="lastname">Last Name</label>  
        <input className="form-control" name="lastname" onChange={this.handleChange}></input>
        {errors.lastname && <p className="form-text text-danger">{errors.lastname}</p>}        
      <label htmlFor="email">Email</label>
        <input className={error ? 'form-control is-invalid': 'form-control'} name="email" onChange={this.handleChange}></input>
        {errors.email && <p className="form-text text-danger">{errors.email}</p>}
      <label htmlFor="password">Password</label>  
        <input className="form-control" type="password" name="password" onChange={this.handleChange}></input>
        {errors.password && <p className="form-text text-danger">{errors.password}</p>}
      <label htmlFor="confirm">Confirm</label>
        <input className="form-control" type="password" name="confirm" onChange={this.handleChange}></input>
        {errors.confirm && <p className="form-text text-danger">{errors.confirm}</p>}
      <label htmlFor="phone">Phone</label>
        <input className="form-control" name="phone" onChange={this.handleChange}></input>
        {errors.phone && <p className="form-text text-danger">{errors.phone}</p>}
        <input type="hidden" name="isSeeker" value={type} />
        <br />
        <input className="btn btn-primary active" type="submit" value="Register"></input><Link className="btn btn-link" to="/login">Login</Link>
      </form>
        <br /><br />
        <p><Link to="/guest">Back</Link></p>

    </div>
    )
  }
}
