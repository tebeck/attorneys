import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Tabs, Tab } from 'react-bootstrap';
import {userServices} from '../../_services';
import Header from '../HeaderComponent';

export default class ProfileComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'personalinfo',
      notification: "",
      firstName: "",
      lastName: "",
      email:"",
      password:"",
      firmName: "",
      policy: "",
      officePhone: "",
      mobilePhone: "",
      streetAddrOne: "",
      creditCard: "",
      showImage:true,
      image:""
    };

    
  }

  componentWillMount(){
    userServices.getProfile()
      .then(data => this.setState({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        firmName: data.data.firmName,
        stateBar: data.data.stateBar,
        officePhone: data.data.officePhone,
        mobilePhone: data.data.mobilePhone,
        email: data.data.email,
        profilePicture: data.data.profilePicture,
        password: data.data.password,
        _userId: data.data._id,
        creditCard: data.data.creditCard,
        notification: data.data.notification,
        firmName: data.data.firmName,
        policy: data.data.policy,
        officePhone: data.data.officePhone,
        mobilePhone: data.data.mobilePhone,
        streetAddrOne: data.data.mailingAddress[0].streetAddrOne,
        image: data.data.profilePicture,
        data: data.data
        
        })
      )
      this.handleChange = this.handleChange.bind(this); // Bind boolean checkbox value.
  }





  fileSelectedHandler = ({target}) => {
    const newForm = new FormData();
     newForm.append('avatar',  target.files[0] , target.files[0].name)

    userServices.upload(newForm)
      .then(data => {
         console.log(data)
         this.setState({
         image: data.data.location })
      })

    this.setState({
      profilePicture: URL.createObjectURL(target.files[0]),
      showImage: true
    })

  }


  openModal() {
      this.setState({
          visible : true
      });
  }

  handleAccSubmit = (e) =>{
    e.preventDefault();
     const {...noErrors} = this.state // Destructuring...
     // const result = validateAcc(noErrors)
     // this.setState({errors: result})

     // if(!Object.keys(result).length) {
       console.log(noErrors)
        userServices.updateAccountInfo(noErrors).then(
          res =>{
           alert(res)
          }
        )
     // }
  }

  handleProfSubmit = (e) =>{
   e.preventDefault();
     const {...noErrors} = this.state // Destructuring...
     // const result = validateProf(noErrors)
     // this.setState({errors: result})
     console.log(noErrors)
     // if(!Object.keys(result).length) {
        userServices.updateProfInfo(noErrors).then(
          res =>{
           alert(res)
          }
        )
     // } 
     // console.log(result)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  
  }



	render() {
    if(this.state.data && this.state.data.mailingAddress[0].city){
   }

		return (
      <div>
        <Header guest="1" />
        <div className="container main-body">
				<h3><Link style={{color: "black"}} to="/home"><i className="fas fa-1x fa-angle-left"></i></Link> Profile</h3>
				<div className="center">
   		        <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={key => this.setState({ key })}
                >
                <Tab eventKey="personalinfo" title="Personal info">
  
                  <div className="text-center">
                    <label className="uploadLabel" htmlFor="avatar">Upload Profile Picture</label>
                    <input id="avatar" type="file" className="inputfile" name="avatar" onChange={this.fileSelectedHandler} /><br /><br />
                    <img alt="avatar" width="200px" src={this.state.profilePicture} />
                 </div>
                  
                  <form onSubmit={this.handleAccSubmit}>
                    <input className="form-control" type="hidden" name="avatar" value={this.state.image}></input>
                    <div className="form-group">
                      <label htmlFor="firstName" className="profileInputsTitle">First Name</label>
                      <input id="firstName" name="firstName" className="form-control bigInput" value={this.state.firstName} placeholder={this.state.firstName} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="profileInputsTitle">Last Name</label>
                      <input id="lastName" name="lastName" className="form-control bigInput" value={this.state.lastName} placeholder={this.state.lastName} onChange={this.handleChange} type="text" />
                    </div>

                    <p className="p-profile">Account info</p>
                    <input className="form-control bigInput" name="email"       type="email"    placeholder={this.state.email} onChange={this.handleChange} value={this.state.email} />
                    <input className="form-control bigInput" name="password"    type="password" placeholder="Old Password"         onChange={this.handleChange} />
                    <input className="form-control bigInput" name="newpassword" type="password" placeholder="New Password"     onChange={this.handleChange} />
                    <input className="form-control bigInput" name="confirm"     type="password" placeholder="Confirm"          onChange={this.handleChange} />
                    
                    
                    <p className="p-profile">Notifications</p>
                    <div className="form-check form-check-inline">
                     <input className="form-check-input" name="notification" type="checkbox" id="notification" checked={this.state.notification} onChange={this.handleChange } />
                     <label className="form-check-label" htmlFor="notification">Email</label>
                    </div>

                    <Link className="link-profile" to="/">Delete Account</Link>
                    

                    <input className="btn btn-block btn-outline-primary btn-profile" type="submit" value="Save" />
                  </form>

                </Tab>
                <Tab eventKey="professionalinfo" title="Prof info">
                  <form onSubmit={this.handleProfSubmit}>
                    <div className="form-group">
                      <label htmlFor="firmName" className="profileInputsTitle">Firm Name</label>
                      <input id="firmName" name="firmName" className="form-control bigInput" value={this.state.firmName} placeholder={this.state.firmName} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="policy" className="profileInputsTitle">Practice Insurance Policy Number</label>
                      <input id="policy" name="policy" className="form-control bigInput" value={this.state.policy} placeholder={this.state.policy} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="officePhone" className="profileInputsTitle">Office Phone</label>
                      <input id="officePhone" name="officePhone" className="form-control bigInput" value={this.state.officePhone} placeholder={this.state.officePhone} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobilePhone" className="profileInputsTitle">Mobile Phone</label>
                      <input id="mobilePhone" name="mobilePhone" className="form-control bigInput" value={this.state.mobilePhone} placeholder={this.state.mobilePhone} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="streetAddrOne" className="profileInputsTitle">Street Address</label>
                      <input id="streetAddrOne" name="streetAddrOne" className="form-control bigInput" value={this.state.streetAddrOne} placeholder={this.state.streetAddrOne} onChange={this.handleChange} type="text" />
                    </div>
                    <p className="p-profile">Payment Info</p>
                    <div className="form-group">
                      <label htmlFor="creditCard" className="profileInputsTitle">Credit Card</label>
                      <input id="creditCard" name="creditCard" className="form-control bigInput" value={this.state.creditCard} placeholder={this.state.creditCard} onChange={this.handleChange} type="text" />
                    </div>
                    <input className="btn btn-block btn-outline-primary btn-profile" type="submit" value="Save" />
                  </form>
                </Tab>
                
                <Tab eventKey="transactions" title="Transactions" >

                </Tab>
            </Tabs>
				</div>
			</div>
			</div>
		);


 }

}
