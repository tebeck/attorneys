import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {userServices} from '../_services/user.service'

const validate = values => {
  const errors = {}

  if(!values.password){
    errors.email = 'Insert a password'
  }
  if(!values.confirm){
    errors.confirm = 'Insert a password'
  } 
  return errors;
}

export default class CreateNewPasswordComponent extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      confirmationCode: ""
    };
    
  }

    state = {
      errors: {},
    }

  handleSubmit = (e) =>{
    e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})
    if(!Object.keys(result).length) {
    
      // Enviar form
      userServices.newPassword(noErrors)
    } else {
      this.setState({ errors: result })
    }

  }

    handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }

	render() {
        const {errors, confirmationCode} = this.state
		return (

            <div className="container">
                <form onSubmit={this.handleSubmit}>
{/*                    <input type="password" name="password" onChange={this.handleChange}></input>
                    {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
                    <input type="password" name="confirm" onChange={this.handleChange}></input>
                    {errors.confirm && <div className="alert alert-danger" role="alert">{errors.confirm}</div>}
                    <input type="hidden" value={confirmationCode} />*/}
                  <input type="submit"></input>
                </form>
            </div>
		);

        }
	}


export { CreateNewPasswordComponent };