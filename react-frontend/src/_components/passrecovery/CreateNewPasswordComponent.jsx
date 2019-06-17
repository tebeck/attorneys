import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {userServices} from '../../_services/user.service'
import Modal from 'react-awesome-modal';
import Header from '../HeaderComponent';

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
      data: ""
    };


  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})
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
            visible : false
        });
    }

    handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }

	render() {
        const {errors, confirmationCode, data} = this.state
		return (
      <div>
        <Header guest="1" />
        <div className="container main-body">
              <h3><Link style={{color: "black"}} to="/recoverpassword"><i className="fas fa-1x fa-angle-left"></i></Link> Set up new password</h3><br />

                <Modal
                    visible={this.state.visible}
                    width="300"
                    height="230"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}>

                  <div style={{padding: "30px",textAlign: "center"}}>
                    <h5>{data}</h5>
                  </div>
                </Modal>

                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                      <input type="password" class="form-control" placeholder="Insert new password"  name="password" onChange={this.handleChange} />
                      {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div> }
                    </div>
                     <div class="form-group">
                      <input type="password" class="form-control" placeholder="Confirm new password"  name="confirm" onChange={this.handleChange} />
                      {errors.confirm && <div className="alert alert-danger" role="alert">{errors.confirm}</div> }
                    </div>
                    <input type="hidden" value={confirmationCode} />
                      <button type="submit" class="btn btn-block btn-primary link-button">Submit</button>
                </form>
            </div>
            </div>
		);

        }
	}


export { CreateNewPasswordComponent };
