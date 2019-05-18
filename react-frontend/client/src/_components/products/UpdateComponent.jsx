import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {productService} from '../../_services/product.service'

const validate = values => {

  const errors = {}
     if(!values.title) {
       errors.title = 'Insert product title'
     }
     if(!values.description) {
      errors.description = 'Insert product description'
    }
     return errors;
   }

   
export default class UpdateComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      showImage: true,
      id: '1',
      published: false
    }

this.handleToggle = this.handleToggle.bind(this);
}


  componentWillMount(){
    var url =window.location.href ;
		var stuff = url.split('/');
		var id = stuff[stuff.length-1];

    productService.getSpecificById(id)
      .then(data => {
        console.log(data)
        this.setState({
          id: id,
          title: data.data.item.title,
          description: data.data.item.description,
          published: data.data.item.published,
          fakeImage: data.data.item.avatar,
          showImage: true,
          beforAva: data.data.item.avatar
        })
      })
  }


handleToggle() {
  console.log(this.state.published)
  this.setState({ published: !this.state.published });
}



handleSubmit = (e) =>{
    e.preventDefault()

    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})
    if(!Object.keys(result).length) {

      if(noErrors.avatar === null){
        noErrors.avatar = this.state.beforAva
      }

      console.log(noErrors)
      productService.updateSpecific(noErrors)
    
    } else {
      console.log("error")
      this.setState({ errors: result  })
    }
  }


  fileSelectedHandler = ({target}) =>{
    
    const newForm = new FormData();
    newForm.append('avatar', target.files[0] , target.files[0].name)

    productService.upload(newForm)
      .then(data => {
        this.setState({
          avatar: data.data.location
        })
      })

    this.setState({
      fakeImage: URL.createObjectURL(target.files[0]),
      showImage: true
    })

  }

      handleChange = ({target}) =>{
      this.setState({
        [target.name]: target.value
      })
      console.log(this.state.published)
    }


  render() {
    const {errors, id, showImage, published, avatar,fakeImage} = this.state



		return (
      <div>
      <h2>Update product</h2>
        
        <div className="col-md-4 mb-3">
          {/*<label className="fileContainer" className="choose" htmlFor="avatar" >Select image</label>*/}
          <input id="avatar" type="file" className="inputfile" name="avatar" ref={this.avatar} onChange={this.fileSelectedHandler} /><br /><br />
          <div className={showImage ? 'display' : 'hide'} ><img alt="avatar" width="150px" src={fakeImage} /></div>
        </div>

      <form onSubmit={this.handleSubmit} id="updateForm">
        
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" value={this.state.title} className="form-control" name="title" onChange={this.handleChange}></input>
            {errors && <p className="form-text text-danger">{errors.title}</p>}<br/>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" value={this.state.description} className="form-control" name="description" onChange={this.handleChange}></input>
            {errors && <p className="form-text text-danger">{errors.description}</p>}<br/>
          </div>
          <div className="col-md-4 mb-3">
            <div>
              <input id="published" type="checkbox" name="published" checked={published} value={published} onChange={this.handleToggle}  /><label htmlFor="published" style={{marginLeft: '10px'}}> Published</label>
            </div>
            {errors && <p className="form-text text-danger">{errors.published}</p>}<br/>
          </div>
             <input type="hidden" value={avatar} name="avatar" />
             <input type="hidden" name="id" value={id}/>  
          <div className="col-md-12 mb-3">
            <input value="Submit" type="submit" className="btn btn-primary"/>
          </div>

        </div>
      </form><br/><br/>

      <Link to="/">Back</Link>

      </div>
    );
  }

}