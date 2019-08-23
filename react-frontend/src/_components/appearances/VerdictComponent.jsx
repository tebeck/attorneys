import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../../_assets/img/btnback.png'
import uploadImg from '../../_assets/img/request/request_upload.png'
import {userServices} from '../../_services/user.service'
import {appearanceService} from '../../_services/appearance.service'
import Dialog from 'react-bootstrap-dialog'
import esquired from '../../_assets/img/landing/logo.png'

Dialog.setOptions({
  defaultOkLabel: 'OK',
  defaultCancelLabel: 'Cancel',
  primaryClassName: 'btn-primary',
  defaultButtonClassName: 'btn-secondary btn-secondary-style'
})
let uploadForm = new FormData();


const validate = values => {
  const errors = {}
  console.log(values)
  if(!values.information){
    errors.information = 'Please insert appearance description before submiting.'
  }

  if(values.verdictDocs.length < 1){
    errors.verdictDocs = 'Please insert verdict documentation before submiting.'
  }

  return errors;
}

export default class NotificationsComponent extends Component {

   constructor(props) {
     super(props);

     this.state = {
     	appId: props.location.state._id,
      information: "",
      verdictDocs: []

     };
   }

  fileSelectedHandler = ({target}) => {
   for (var i = 0; i < target.files.length; i++) {
     uploadForm.append('avatar', target.files[i] , target.files[i].name)
   }

    userServices.multiupload(uploadForm)
      .then(data => {
         this.setState({
          verdictDocs: data.data.location 
         })

      })
      .then(target.value = '')
  }




  deleteFiles = (e) => {
   e.preventDefault()

    this.dialog.show({
      title: <img alt="esquired" className="dialog-img" src={esquired} />,
      body: 'Do you want to clear all files?',
      actions: [ 
        Dialog.OKAction(() => { 
            uploadForm.delete('avatar')
            this.setState({ verdictDocs: [] });
         }),
        Dialog.CancelAction(() => {  }) 
        ],
      bsSize: 'small',
      onHide: (dialog) => { 
        dialog.hide()
      } 

    })
  }

  completeAppearance = (e) =>{
  	e.preventDefault()
    const {errors, ...noErrors} = this.state // Destructuring...
    
    const result = validate(noErrors)
    this.setState({errors: result})
    console.log(result)
    if(!Object.keys(result).length) {

    let body = {
  		appId: this.state.appId,
      information: this.state.information,
      verdictDocs: this.state.verdictDocs
  	}
  	appearanceService.completeAppearance(body)
        .then(data=>{ if(data.status === 200){
         this.dialog.show({
              title: <img alt="esquired" className="dialog-img" src={esquired} />,
              body: data.message,
              actions: [ Dialog.OKAction(() => { window.location.assign('/home') })],
              bsSize: 'small',
              onHide: (dialog) => { 
                dialog.hide() 
                window.location.assign('/home') 
              }
            })
        } })

    } else {
      this.setState({ errors: result })
    }
  }

    handleChange = ({target}) =>{
      this.setState({ [target.name]: target.value });
    }

  render() {



   
    const {errors} = this.state
   return (
    <div className="container main-body">
    
      <Link style={{color: "black"}} to="/home">
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Submit Verdict</h3>
      </Link>			
       <hr />
      <div >

      <Dialog ref={(el) => { this.dialog = el }} />
      <div>
        <label htmlFor="description" >Upload the verdict info</label>
        {errors && errors.information && <div style={{fontSize: "13px", padding: "1px", margin: "0px",color:"red"}} >{errors.information}</div>}
        <input className="form-control" placeholder="Description" name="information" type="text" onChange={this.handleChange} value={this.state.information} />
      </div>
        <div>
        <br/>
            <div>
              <p><b>Documents</b></p>
              {errors && errors.verdictDocs && <div style={{fontSize: "13px", padding: "1px", margin: "0px",color:"red"}} >{errors.verdictDocs}</div>}
              <label className="uploadLabel squareUpload" htmlFor="avatar" >
               <div className="squareImg uploadsimg" >
                 <img src={uploadImg} alt="profileImg" width="150px" /><br />Upload<br />
                 <input id="avatar" multiple type="file" className="inputfile" name="avatar" onChange={this.fileSelectedHandler} /><br /><br /> 
                </div>
              </label><br/>
            </div>

            <div>
            {this.state.verdictDocs ? 
              this.state.verdictDocs.map((x,i) => (
                  <div key={i} style={{marginBottom: "10px"}}><a href={x.location} className="link-new-file" download target="_blank" rel="noopener noreferrer">{x.originalname}</a></div>
              )): null}
              {this.state.verdictDocs.length > 0 ? <button className="clearFiles" onClick={this.deleteFiles}>Clear files</button> : null }
            </div>
            <div className="center">
             <button onClick={this.completeAppearance} className="btn btn-primary link-button">Submit</button>
            </div>
          </div>
      </div>
       <hr />
       
    </div>
  	);
  }
}
