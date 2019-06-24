import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import Modal from 'react-awesome-modal';
import Header from '../HeaderComponent';


export default class RecoverPasswordComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      fromDesktop:false,
      pathname: "/authenticate"
    }


    console.log(props.location.fromDesktop)
  }

  componentWillMount(){
   if(this.props.location.fromDesktop){
     this.setState({
       pathname: "/home"
     })
   }
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})
    if(!Object.keys(result).length) {

      // Enviar form
      userServices.recoverPassword(noErrors)
        .then(data => {
          if(data.message === "No user found"){
            this.setState({
              errUser: "The user does not exist"
            })
          } else{
            this.openModal()
          }
        })
      
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




    const {errors, pathname, errUser} = this.state
		return (

      <div>
        <Header guest="1" />
        <div className="container main-body">
            <h5><Link style={{color: "black"}} to={pathname}><i className="fas fa-1x fa-angle-left"></i></Link> Send email notification</h5>
                <Modal
                    visible={this.state.visible}
                    width="300"
                    height="230"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}>

                  <div className="recoverPassModal">
                    <h5>Confirmation code sent, please check your email box!</h5>
                    <button onClick={() => this.closeModal()} className="recoverPassButton link-button">Close</button>
                  </div>
                     
                </Modal><br />
                  <div className={errUser ? 'display' : 'hide'}>
                  <div className="alert alert-danger" role="alert">{errUser}</div></div>
            <form onSubmit={this.handleSubmit}>
                <input className="form-control" type="text" name="email" placeholder="Email" onChange={this.handleChange}></input>
                {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
                <input className="btn btn-block btn-primary link-button active" type="submit" value="Send"></input>
            </form>
            </div>
            </div>
		);

   }
 }

const validator = require('validator');
const validate = values => {
  const errors = {}

  if(!values.email) { errors.email = 'Please check the email"' }
  if(values.email && !validator.isEmail(values.email)){ errors.email = "Please check the email"}
  
  return errors;

  }

  


