import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {productService} from '../../_services/product.service'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { toast } from 'react-toastify';

const validate = values => {
  const errors = {}
     if(!values.id) {
       errors.id = 'Insert product id'
     }
     return errors;
   }
const successOption = {
    autoClose: 3000, 
    type: toast.TYPE.INFO,
    hideProgressBar: false,
    position: "top-center"
};
const errorOptions = {
    autoClose: 3000, 
    type: toast.TYPE.ERROR,
    hideProgressBar: false,
    position: "top-center"

};


   
export default class DeleteComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
    }

}

_delete = (data) => {
    productService._delete(data).then(
      response =>{
         if(response.status === 'success'){
           toast.success("Product successfully deleted", successOption)
         } else {
           toast.success("Error, product not found", errorOptions)
         }
      })
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
        this._delete(noErrors)
    } else {
      this.setState({ errors: result  })
    }
  }

  render() {
    const {errors} = this.state 
		return (
      <div>
      <h1>Delete product</h1>
      <ToastContainer />
      <form onSubmit={this.handleSubmit}>
      <label htmlFor="id">Delete product by id</label><br/>  
            <input className="form-control" name="id" onChange={this.handleChange}></input>
            {errors && <p className="form-text text-danger">{errors.id}</p>}<br/>
            <input type="submit" className="btn btn-secondary"/>
      </form><br/><br/>

      <Link to="/">Back</Link>

      </div>
    );
  }

}