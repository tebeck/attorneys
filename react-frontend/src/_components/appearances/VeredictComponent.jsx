import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../../_assets/img/btnback.png'
import uploadImg from '../../_assets/img/request/request_upload.png'
import {userServices} from '../../_services/user.service'
import {appearanceService} from '../../_services/appearance.service'

let uploadForm = new FormData();

export default class NotificationsComponent extends Component {

   constructor(props) {
     super(props);
   	console.log(props.location.state)
     this.state = {
     	appId: props.location.state._id,
      information: "",
      veredictDocs: []

     };
   }

  fileSelectedHandler = ({target}) => {
   for (var i = 0; i < target.files.length; i++) {
     uploadForm.append('avatar', target.files[i] , target.files[i].name)
   }

    userServices.multiupload(uploadForm)
      .then(data => {
         this.setState({
          veredictDocs: data.data.location 
         })

      })
      .then(target.value = '')
  }


  deleteFiles = (e) => {

   e.preventDefault()
    var r = window.confirm("Do you want to clear all files?");
    if (r == true) {
     
     uploadForm.delete('avatar')

     console.log(uploadForm.getAll('avatar'))
     this.setState({ veredictDocs: [] });
    }

  }

  completeAppearance = () =>{
  	let body = {
  		appId: this.state.appId,
      information: this.state.information,
      veredictDocs: this.state.veredictDocs
  	}
  	appearanceService.completeAppearance(body)
  	 .then(alert("APPEARANCE COMPLETED"))
     .then(window.location.assign('/home'))
  }

    handleChange = ({target}) =>{
      this.setState({ [target.name]: target.value });
    }

  render() {
   
   return (
    <div className="container main-body">
      <Link style={{color: "black"}} to="/home">
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Submit Veredict</h3>
      </Link>			
       <hr />
      <div >
      <div>
        <label htmlFor="description" >Upload the veredict info</label>
        <input className="form-control" name="information" type="text" onChange={this.handleChange} value={this.state.information} />
      </div>
        <div>
        <br/>
            <div>
              <p><b>Documents</b></p>
              <label className="uploadLabel squareUpload" htmlFor="avatar" >
               <div className="squareImg" >
                 <img src={uploadImg} alt="profileImg" width="150px" /><br />Upload<br />
                 <input id="avatar" multiple type="file" className="inputfile" name="avatar" onChange={this.fileSelectedHandler} /><br /><br /> 
                </div>
              </label><br/>
            </div>

            <div>
            {this.state.veredictDocs ? 
              this.state.veredictDocs.map((x,i) => (
                  <div key={i} style={{marginBottom: "10px"}}><a href={x.location} className="link-new-file" download target="_blank">{x.originalname}</a></div>
              )): null}
              {this.state.veredictDocs ? <button onClick={this.deleteFiles}>Clear files</button> : null }
            </div>

          <button onClick={this.completeAppearance} className="btn btn-primary link-button">Submit</button>
          </div>
      </div>
       <hr />
    </div>
  	);
  }
}