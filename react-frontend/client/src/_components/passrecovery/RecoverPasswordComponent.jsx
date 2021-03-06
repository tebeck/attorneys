import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import Modal from 'react-awesome-modal';

const validate = values => {
  const errors = {}

  if(!values.email){
    errors.email = 'Insert an email'
  }
  
  return errors;
}

export default class RecoverPasswordComponent extends Component {

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
      userServices.recoverPassword(noErrors)

      this.openModal()
    } else {
      this.setState({ errors: result })
    }

  }

    handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }

      openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

	render() {
        const {errors} = this.state
		return (

            <div className="container">
            <h5><Link style={{color: "black"}} to="/login"><i className="fas fa-1x fa-angle-left"></i></Link> Send email notification</h5>
                <Modal 
                    visible={this.state.visible}
                    width="300"
                    height="230"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}>
                  
                  <div style={{padding: "30px",textAlign: "center"}}>
                    <h5>Confirmation code sent, please check your email box!</h5>
                    <p>Check also in spam email.</p>
                  </div>
                    <div style={{borderRadius: "0px 0px 5px 5px",padding: "30px", paddingTop: "20px",textAlign: "center",height:"30%", width:"100%", backgroundColor: "lightgrey"}}>
                      <Link style={{fontSize: "13px"}} to="/">Click here to re-send the email</Link>
                    </div>  
                </Modal><br />
            <form onSubmit={this.handleSubmit}>    
                <input className="form-control" type="text" name="email" placeholder="Email" onChange={this.handleChange}></input>
                {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
                <input className="btn btn-block btn-primary active" type="submit" value="Send"></input>
            </form>
            </div>
		);

        }
	}




export { RecoverPasswordComponent };