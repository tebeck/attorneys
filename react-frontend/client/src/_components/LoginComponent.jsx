import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {userServices} from '../_services/user.service'

const validate = values => {
  const errors = {}

  if(!values.email){
    errors.email = 'Insert an email'
  }
  if(!values.password) {
    errors.password = 'Insert a password'
  }
  
  return errors;
}

export default class LoginComponent extends Component {

state = {
  errors: {},
}

constructor(props) {
  super(props)
  this.state = {
    ...this.state,
    errlogin: false
  }
  Cookies.remove('token')
  Cookies.remove('user')
  Cookies.remove('email')
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
    
      // Enviar form
      this.userLogin(noErrors)
    } else {
      this.setState({ errors: result })
    }

  }

    userLogin = (data) => {
    userServices.authenticate(data).then(res =>{
        if(res.response.state === 409 || res.response.state === 401){
          this.setState({errlogin: true})
        } else {
          //window.location.assign('/')
        }
      })
  }

  render(){
    const {errors, errlogin} = this.state
  return(
    <div className="col-md-12 col-md-offset-3">
    <h2>Login</h2>
      <form name="form" onSubmit={this.handleSubmit}>
        <div className={errlogin ? 'display' : 'hide'}>
        <div className="alert alert-danger" role="alert">
          Invalid credentials. Try again.
        </div>
        </div>
          {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
          {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
          <label htmlFor="email">Email</label>
          <input className="form-control" type="text" name="email" onChange={this.handleChange}></input>
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" onChange={this.handleChange}></input><br/>
          <input className="btn btn-primary active" type="submit" value="Login"></input>
          <Link className="btn btn-link" to="/register">Register</Link>
         </form>
          <br /><br />
          <p><Link to="/guest">Back</Link></p>
        </div>

    )
  }
}
