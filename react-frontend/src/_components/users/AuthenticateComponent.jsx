import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userServices } from '../../_services/user.service'
import landing0 from '../../_assets/img/landing/landing_0.png'

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
    Cookies.remove('esquired')
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
      console.log(noErrors)
      userServices.authenticate(noErrors)
        .then(data => {
          if (data.status !== 200) {
            this.setState({
              errlogin: data.message
             })
           } else {
             window.location.assign('/home')
           }
          }
      )

    } else {
      this.setState({ errors: result })
    }

  }


  render(){
    const {errors, errlogin} = this.state
  return(
    <div>
    <div className="center">
    <h1>Esquire'd</h1>
      <img src={landing0} alt="example" /> <br /><br />
    </div>  
      <form name="form" onSubmit={this.handleSubmit}>
        <div className={errlogin ? 'display' : 'hide'}>
        <div className="alert alert-danger" role="alert">
          {this.state.errlogin}
        </div>
        </div>
          {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
          {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
          <input className="form-control" type="text" name="email" onChange={this.handleChange} placeholder="User" ></input>
          <input className="form-control" type="password" name="password" onChange={this.handleChange} placeholder="Password"></input>
          <small><Link to="/recoverpassword">Forgot your Password?</Link></small><br /><br />
          <input className="btn btn-block btn-primary active" type="submit" value="Login"></input>
          <div className="center"><br />
            <p>Don't have an account?<Link to="/definerole"> Sign Up</Link></p>
          </div>
         </form>

        </div>

    )
  }
}
