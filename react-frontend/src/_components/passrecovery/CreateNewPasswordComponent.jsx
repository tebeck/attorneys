import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import Modal from 'react-awesome-modal';
import Header from '../HeaderComponent';
import backbutton from '../../_assets/img/btnback.png'

const validate = values => {
  const errors = {}

  if(!values.password){
    errors.password = 'Insert a password'
  }
  if(!values.confirm){
    errors.confirm = 'Confirm password'
  }
  return errors;
}

export default class CreateNewPasswordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: this.props.location.search.split('=')[1],
      errors: {},
      data: "",
      redirectHome: false
    };


  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})
    console.log(noErrors)
    if(!Object.keys(result).length) {
    // Enviar form
      userServices.changePassword(noErrors)
       .then(data => this.openModal(data))
    } else {
      this.setState({ errors: result })
    }
  }

    openModal(res) {
        this.setState({
            visible : true,
            data: res
        });
    }

    closeModal() {
        this.setState({
            visible : false,
            redirectHome: true
        });
    }

    handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }

	render() {

    if(this.state.redirectHome){
      return <Redirect push to={{ pathname: "/home" }} />;
    }

    const {errors, confirmationCode, data} = this.state
		return (
      <div>
        <Header guest="1" />
        <div className="container main-body">
         <Link style={{color: "black"}} to="/home">
         <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
         <h3 style={{display: "inline"}  }> Set up new password</h3>
        </Link>   
        <hr />

                <Modal
                    visible={this.state.visible}
                    width="300"
                    height="230"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}>

                  <div style={{padding: "30px",textAlign: "center"}}>
                    <h5>{data}</h5>
                    <button onClick={() => this.closeModal()} className="recoverPassButton link-button">Close</button>
                  </div>

                </Modal>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input type="password" className="form-control" placeholder="Insert new password"  name="password" onChange={this.handleChange} />
                      {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div> }
                    </div>
                     <div className="form-group">
                      <input type="password" className="form-control" placeholder="Confirm new password"  name="confirm" onChange={this.handleChange} />
                      {errors.confirm && <div className="alert alert-danger" role="alert">{errors.confirm}</div> }
                    </div>
                    <input type="hidden" value={confirmationCode} />
                      <button type="submit" className="btn btn-block btn-primary link-button">Submit</button>
                </form>
            </div>
            </div>
		 );
    }
	}





