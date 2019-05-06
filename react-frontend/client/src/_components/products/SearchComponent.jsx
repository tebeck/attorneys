import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {productService} from '../../_services/product.service'

const validate = values => {
 const errors = {}
    if(!values.title) {
      errors.title = 'Insert product title or category'
    }
    return errors;
  }

  
export default class SearchComponent extends Component {
      
    constructor(props) {
        super(props)
        this.state = {
          ...this.state,
          flag: false,
          data: []
        }

    }

    getSpecific = (data) => {
        productService.getSpecific(data).then(
          data =>{
            this.setState({
              data: data
            })
          

     if(this.state.data.length < 1 ){
        this.setState({ flag: true}) } else { this.setState({ flag: false }) }
      }
   )}





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
            this.getSpecific(noErrors)
        } else {
          this.setState({ errors: result  })
        }
      }

  render() {

    const {errors, data, flag} = this.state

    return (
      <div className="col-md-12">
         <div className={flag ? 'display' : 'hide'}>
            <div className="alert alert-danger" role="alert">
            No results found.
          </div>
        </div>

        <form name="form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Product title or category</label><br/>  
            <input className="form-control" name="title" onChange={this.handleChange}></input>
            {errors && <p className="form-text text-danger">{errors.title}</p>}<br/>
            <input type="submit" value="Search" className="btn btn-primary"/>
        </form> <br/><br/>
        {data && data.map(x=> 
          <div className="col-md-6" style={{"display":"inline-block", "border": ".5px solid grey", "margin": "1px", "padding": "5px"}} key={x._id}>
           <p><b>ID</b>: <i>{x._id}</i></p> 
           <p><b>Title</b>: <i>{x.title}</i></p>
           <p><b>Picture</b>: <img alt="avatar" width="150px" src={x.avatar} /> </p>
           <p><b>Slug</b>: <i>{x.slug}</i></p>
           <p><b>Description</b>: <i>{x.description}</i></p>

          </div> )}

          
        <br /><br /><br />
        <Link to="/">Back</Link>
        

      </div>
    );
  }

}