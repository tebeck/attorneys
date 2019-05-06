import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {productService} from '../../_services/product.service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { toast } from 'react-toastify';


const validate = values => {
  const errors = {}
     if(!values.title) {
       errors.title = 'Insert product title'
     }
     if(!values.description) {
      errors.description = 'Insert product description'
    }
    // if(!values.avatar) {
    //   errors.avatar = 'Insert product avatar'
    // }
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
   
export default class CreateComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      image: '',
      showImage: false,
      published: false,
      location: ''
    }

    this.avatar = React.createRef()
    this.togglePublishValue = this.togglePublishValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)


}

togglePublishValue() {
  const published = this.state.published;
  this.setState({ published: !published });
}

add = () => {

  var serialize = require('form-serialize');
  var form = document.querySelector('#createForm');
  var obj = serialize(form, { hash: true });

  console.log(obj)

    productService.add(obj).then(
      data =>{
         if(data.status === 200){
           console.log(data)
           toast.success("Product successfully created", successOption)
         } else {
           toast.success("Error, please try again later", errorOptions)
         }
      }
    )
  }

fileSelectedHandler = ({target}) =>{
    
    const newForm = new FormData();
    newForm.append('avatar', target.files[0] , target.files[0].name)

    productService.upload(newForm)
      .then(data => {
        this.setState({
          location: data.data.location
        })
      })

    this.setState({
      image: URL.createObjectURL(target.files[0]),
      showImage: true
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
        this.add()
    } else {
      this.setState({ errors: result  })
    }
  }

  render() {


    const {errors, image, showImage, location} = this.state


		return (
      <div>
      <ToastContainer />
      <h1 style={{marginBottom: '40px'}}>Create product</h1>
      
      <div className="form-row">
        <div className="col-md-5 mb-3">
          <label className="fileContainer" className="choose" htmlFor="avatar">Select image</label>
          <input id="avatar" type="file" className="inputfile" name="avatar" ref={this.avatar} onChange={this.fileSelectedHandler} /><br /><br />
          <div className={showImage ? 'display' : 'hide'} ><img alt="avatar" width="300px" src={image} /></div>
        </div>
      </div>

      
      <form onSubmit={this.handleSubmit} id="createForm">
        <div className="form-row">
          <div className="col-md-5 mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" name="title" onChange={this.handleChange}></input>
            {errors && <p className="form-text text-danger">{errors.title}</p>}<br/>
          </div>
          <div className="col-md-5 mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" name="description" onChange={this.handleChange}></input>
            {errors && <p className="form-text text-danger">{errors.description}</p>}<br/>
          </div>
          <div className="col-md-4 mb-3">
            <div><label className="radio-inline">
            <input type="checkbox" name="published" value={this.state.published} checked={this.state.published} onClick={this.togglePublishValue} onChange={this.handleChange}/> Published</label></div>
            {errors && <p className="form-text text-danger">{errors.published}</p>}<br/>
          </div>

          <div className="col-md-4 mb-3">
            <p htmlFor="categories">Categories</p>
            <div><input id="cars" className="radio-inline" type="checkbox" name="categories[][category]" value="cars" onChange={this.handleChange} /> <label htmlFor="cars"> Cars</label></div>
            <div><input id="music" className="radio-inline" type="checkbox" name="categories[][category]" value="music" onChange={this.handleChange} /> <label htmlFor="music"> Music</label></div>
            <div><input id="sports" className="radio-inline" type="checkbox" name="categories[][category]" value="sports" onChange={this.handleChange} /> <label htmlFor="sports"> Sports</label></div>
            <div><input id="art" className="radio-inline" type="checkbox" name="categories[][category]" value="art" onChange={this.handleChange} /> <label htmlFor="art"> Art</label></div>
            <div><input id="electronic" className="radio-inline" type="checkbox" name="categories[][category]" value="electronic" onChange={this.handleChange} /> <label htmlFor="electronic"> Electronic</label></div>
            {errors && <p className="form-text text-danger">{errors.categories}</p>}<br/>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="packages">Packages</label>
            <div><input id="100g" type="checkbox" className="radio-inline" name="packages[][grams]" value="100" onChange={this.handleChange}/> <label htmlFor="100g"> 100</label></div>
            <div><input id="200g" type="checkbox" className="radio-inline" name="packages[][grams]" value="200" onChange={this.handleChange}/> <label htmlFor="200g"> 200</label></div>
            {errors && <p className="form-text text-danger">{errors.packages}</p>}<br/>
          </div>
            <input type="hidden" value={location} name="avatar" />
            
          
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