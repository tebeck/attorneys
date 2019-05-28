import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { toast } from 'react-toastify';


const validate = values => {
  const errors = {}
    //  if(!values.title) {
    //    errors.title = 'Insert product title'
    //  }
    //  if(!values.description) {
    //   errors.description = 'Insert product description'
    // }
    // if(!values.avatar) {
    //   errors.avatar = 'Insert product avatar'
    // }
     return errors;
   }

   
export default class CreateComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
    clientPresent:true,
    lateCall:true,
    responseCreate: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)


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

       appearanceService.create(noErrors)
         .then(data => alert(data.message) )

    } else {
      this.setState({ errors: result  })
    }
  }

  render() {


    const {errors} = this.state


		return (
      <div>
      <ToastContainer />
      <h3 style={{marginBottom: "30px"}}><Link style={{color: "black"}} to="/"><i className="fas fa-1x fa-angle-left"></i></Link> Create appearance</h3>
      
      <form onSubmit={this.handleSubmit} id="createForm">
        <div className="form-row">
          <div className="col-md-5 mb-3">
            <input type="text" className="form-control" name="courtHouse" onChange={this.handleChange} placeholder="Court House"></input>
            {errors && <p className="form-text text-danger">{errors.courtHouse}</p>}
          </div>
          <div className="col-md-5 mb-3">
            <input type="text" className="form-control" name="areaOfLaw" onChange={this.handleChange} placeholder="Area Of Law"></input>
            {errors && <p className="form-text text-danger">{errors.areaOfLaw}</p>}
          </div>
          <div className="col-md-5 mb-3">
            <input type="text" className="form-control" name="goal" onChange={this.handleChange} placeholder="Goal"></input>
            {errors && <p className="form-text text-danger">{errors.goal}</p>}
          </div>
          <div className="col-md-5 mb-3">
            <input type="text" className="form-control" name="contextInformation" onChange={this.handleChange} placeholder="Context Information"></input>
            {errors && <p className="form-text text-danger">{errors.contextInformation}</p>}
          </div>
          <div className="col-md-5 mb-3">
            <input type="checkbox" className="form-control" name="clientPresent" onChange={this.handleChange} placeholder="Client Present" value={this.state.clientPresent}></input>
          </div>
          <div className="col-md-5 mb-3">
            <input type="checkbox" className="form-control" name="lateCall" onChange={this.handleChange} placeholder="Late Call" value={this.state.lateCall}></input>
          </div>
          <div className="col-md-5 mb-3">
            <input type="text" className="form-control" name="additionalComments" onChange={this.handleChange} placeholder="Additional Comments"></input>
            {errors && <p className="form-text text-danger">{errors.additionalComments}</p>}
          </div>                    
          <div className="col-md-12 mb-3">
            <input value="Submit" type="submit" className="btn btn-primary"/>
            
          </div>

        </div>
      </form><br/><br/>

      <Link to="/"> Go back</Link>

      </div>
    );
  }

}